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

            const cartKey = `cart-${session.metadata?.userId}`;
            const cart: Cart | null = await redis.get(cartKey);
        
            const order = await prisma.order.create({
                data: {
                    amount: session.amount_total as number,
                    status: session.payment_status as string,
                    userId: session.metadata?.userId,
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