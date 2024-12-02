"use server"
import { v4 as uuidv4 } from 'uuid';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod} from "@conform-to/zod";
import { bannerSchema, productSchema } from "@/lib/zodSchemas";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { Cart } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

const adminEmails = [
    process.env.ADMIN_EMAIL1,
    process.env.ADMIN_EMAIL2,
    process.env.ADMIN_EMAIL3
];
 
export async function createProduct(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user || !adminEmails.includes(user.email!)) {
        return redirect("/");
    }
    
    const submission = parseWithZod(formData, {
        schema: productSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    };

    const flattenedUrls = submission.value.images.flatMap((urlString) => 
        urlString.split(",").map((url) => url.trim()));
    const flattenedColors = submission.value.colors.flatMap((urlString) => 
        urlString.split(",").map((url) => url.trim()));
    const flattenedSizes = submission.value.sizes.flatMap((urlString) => 
        urlString.split(",").map((url) => url.trim()));

    await prisma.product.create({
        data: {
            name: submission.value.name,
            description: submission.value.description,
            status: submission.value.status,
            price: submission.value.price,
            images: flattenedUrls,
            colors: flattenedColors,
            sizes: flattenedSizes,
            category: submission.value.category,
            isFeatured: submission.value.isFeatured === true ? true : false,
        }
    });

    redirect("/dashboard/products");
}

export async function editProduct (prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user || !adminEmails.includes(user.email!)) {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: productSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    };

    const flattenedUrls = submission.value.images.flatMap((urlString) => 
        urlString.split(",").map((url) => url.trim()));
    const flattenedColors = submission.value.colors.flatMap((urlString) => 
        urlString.split(",").map((url) => url.trim()));
    const flattenedSizes = submission.value.sizes.flatMap((urlString) => 
        urlString.split(",").map((url) => url.trim()));

    const productId = formData.get("productId") as string;
    await prisma.product.update({
        where: {id: productId},
        data: {
            name: submission.value.name,
            description: submission.value.description,
            status: submission.value.status,
            price: submission.value.price,
            images: flattenedUrls,
            colors: flattenedColors,
            sizes: flattenedSizes,
            category: submission.value.category,
            isFeatured: submission.value.isFeatured === true ? true : false,
        }
    });

    redirect("/dashboard/products")
}

export async function deleteProduct (formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
   if (!user || !adminEmails.includes(user.email!)) {
        return redirect("/");
    }

    const productId = formData.get("productId") as string;
    await prisma.product.delete({where: {id: productId}});

    redirect("/dashboard/products")
}

export async function createBanner(prevState: unknown, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user || !adminEmails.includes(user.email!)) {
        return redirect("/");
    }

    const submission = parseWithZod(formData, {
        schema: bannerSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    };

    await prisma.banner.create({
        data: {
            title: submission.value.title,
            imageString: submission.value.imageString,
        }
    });

    redirect("/dashboard/banner");
}

export async function deleteBanner (formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user || !adminEmails.includes(user.email!)) {
        return redirect("/");
    }

    const bannerId = formData.get("bannerId") as string;
    await prisma.banner.delete({where: {id: bannerId}});

    redirect("/dashboard/banner")
}

export async function addItem(formData: FormData) {
    const productId = formData.get('productId') as string;
    const color = formData.get('color') as string;
    const size = formData.get('size') as string;
    const quantity = parseInt(formData.get('quantity') as string, 10);

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {return redirect("/")};

    let cart: Cart | null = await redis.get(`cart-${user.id}`);

    const selectedProduct = await prisma.product.findUnique({
        where: {id: productId}
    });

    if (!selectedProduct) { 
        throw new Error("Product not found")
    };

    let myCart = {} as Cart

    if (!cart || !cart.items) {
        myCart= {
            userId: user.id,
            items: [{
                id: uuidv4(),
                productId: selectedProduct.id,
                name: selectedProduct.name,
                quantity: quantity,
                price: selectedProduct.price,
                image: selectedProduct.images[0],
                color: color,
                size: size
            }]
        }
    } else {
        myCart = cart;
        let itemFound = false;

        myCart.items = cart.items.map((item) => {
            if (item.productId === selectedProduct.id && item.color === color && item.size === size) {
                itemFound = true;
                quantity === 1 ? item.quantity++ : item.quantity = quantity;
            }
            return item;
        })

        if(!itemFound) {
            myCart.items.push({
                id: uuidv4(),
                productId: selectedProduct.id,
                name: selectedProduct.name,
                quantity: quantity,
                price: selectedProduct.price,
                image: selectedProduct.images[0],
                color: color,
                size: size
            })
        }
    }

    await redis.set(`cart-${user.id}`, myCart);
    revalidatePath("/", "layout");
}

export async function deleteItem (formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {return redirect("/")};

    const itemId = formData.get('itemId');

    let cart: Cart | null = await redis.get(`cart-${user.id}`);

    if(cart && cart.items) {
        const updateCart: Cart = {
            userId: user.id,
            items: cart.items.filter((item) => item.id !== itemId)
        }

        await redis.set(`cart-${user.id}`, updateCart);
    }

    revalidatePath("/shoppingcart");
}

export async function checkout() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {return redirect("/")};

    let cart: Cart | null = await redis.get(`cart-${user.id}`);

    if(cart && cart.items) {
        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.items.map((item) => ({
            price_data: {
                currency: 'sek',
                unit_amount: item.price,
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: lineItems,
            success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
            metadata: {
                userId: user.id,
            }
        });

        return redirect(session.url!);
    }
}