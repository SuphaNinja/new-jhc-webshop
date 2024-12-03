import { Cart } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST (req: Request) {
    const body = await req.text();

    const signature = (await headers()).get("Stripe-Signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error: unknown) {
        return new Response("Webhook Error", { status: 400 });
    }

    switch(event.type) {
        case "checkout.session.completed": {

            const session = event.data.object;
            console.log(session)
            const cartKey = `cart-${session.metadata?.userId}`;
            const cart: Cart | null = await redis.get(cartKey);
        
            const order = await prisma.order.create({
                data: {
                    amount: session.amount_total as number,
                    status: session.payment_status as string,
                    userId: session.metadata?.userId,
                    shippingCity: session.shipping_details?.address?.city,
                    shippingCountry: session.shipping_details?.address?.country,
                    shippingLine1: session.shipping_details?.address?.line1,
                    shippingPostalCode: session.shipping_details?.address?.postal_code,
                    phoneNumber: session.customer_details?.phone,
                    taxIdType: session.customer_details?.tax_ids?.[0]?.type,
                    taxIdValue: session.customer_details?.tax_ids?.[0]?.value,
                    name: session.shipping_details?.name,
                    items: {
                    create: cart!.items.map((item: any) => ({
                        productId: item.productId,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        color: item.color,
                        size: item.size,
                        image: item.image
                    }))
                    }
                },
                include: {
                    items: true
                }
            });

            await redis.del(cartKey);
            break;
        }
        default: console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(null, { status: 200 });
}