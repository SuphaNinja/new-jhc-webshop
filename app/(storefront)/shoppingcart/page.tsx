import { Cart } from '@/lib/interfaces';
import { redis } from '@/lib/redis';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import ShoppingCart from '@/app/components/shoppingcart/ShoppingCart';

export default async function ShoppingCartPage() {
    noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if(!user) { redirect("/")}

    const cart: Cart | null = await redis.get(`cart-${user.id}`);

    let totalPrice = 0;
    cart?.items.forEach((item) => {
        totalPrice += item.price * item.quantity
    });

    return (
        <ShoppingCart cart={cart} totalPrice={totalPrice} />
    )
    
}