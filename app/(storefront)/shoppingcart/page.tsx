import { checkout, deleteItem } from '@/app/actions';
import { CheckoutButton, DeleteItemButton } from '@/app/components/SubmitButtons';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/formatPrice';
import { Cart } from '@/lib/interfaces';
import { redis } from '@/lib/redis';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ShoppingBagIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache'

export default async function ShoppingCartPage() {
    noStore();
    const { getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        redirect("/");
    }

    const cart: Cart | null = await redis.get(`cart-${user.id}`);

    let totalPrice = 0;
    cart?.items.forEach((item) => {
        totalPrice += item.price * item.quantity
    })
    return (
        <div className='max-w-2xl mx-auto min-h[55vh] mt-10'>
            {!cart || !cart.items ? (
                <div className='flex min-h-[400px] flex-col items-center justify-center rounded-lg border-dashed border p-8 text-center mt-20'>
                    <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
                        <ShoppingBagIcon className='size-10 text-primary'/>
                    </div>
                    <h2 className='mt-6 text-xl font-semibold'>Your cart is empty</h2>
                    <p className='mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto'>
                        You currently dont have any products in your cart, please add some and you will see them right here.
                    </p>
                    <Button asChild>
                        <Link href={"/shop"}>Shop now</Link>
                    </Button>
                </div>
            ):(
            <div className='flex flex-col gap-y-10'>
                <div className='mt-10 border-b-2 pb-4'>
                    <h1 className='text-2xl font-semibold mb-4'>Shopping Cart</h1>
                    <div className='flex justify-between font-medium'>
                        <p>Subtotal:</p>
                        <p>{formatPrice(totalPrice)}</p>
                    </div>
                </div>
                {cart?.items.map((item, index) => (
                    <div key={index} className='flex border-b pb-4'>
                        <div className='size-24 sm:size-32 relative'>
                            <Image className='rounded-md object-cover' src={item.image} alt={item.name} fill/>
                        </div>
                        <div className='ml-5 flex justify-between w-full font-medium'>
                            <div className='flex flex-col'>
                                <p>{item.name}</p>
                                {item.color !== "" && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium">Color:</span>
                                        <div
                                            className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                                            style={{ backgroundColor: item.color }}
                                        />
                                    </div>
                                )}
                                {item.size !== "" && (
                                    <div className='inline-flex gap-1 text-sm font-medium'>Size:
                                        <p className='text-sm font-medium'>{item.size}</p>
                                    </div>
                                )}
                                
                            </div>
                            <div className='flex flex-col h-full justify-between'>
                                <div className='flex items-center gap-2'>
                                    <p>{item.quantity} x</p>
                                    <p>{formatPrice(item.price)}</p>
                                </div>
                               <form action={deleteItem} className='text-end'>
                                <input type="hidden" name="itemId" value={item.id} />
                                    <DeleteItemButton />
                               </form>
                            </div>
                        </div>
                    </div>
                ))}
                <form action={checkout}>
                    <CheckoutButton/>
                </form>
            </div>
            )}
        </div>
    )
}

