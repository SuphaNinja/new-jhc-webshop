import { checkout, deleteItem } from '@/app/actions';
import { CheckoutButton, DeleteItemButton } from '@/app/components/SubmitButtons';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/formatPrice';
import { Cart } from '@/lib/interfaces';
import { redis } from '@/lib/redis';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { ShoppingBagIcon, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default async function ShoppingCartPage() {
    noStore();
    const { getUser } = getKindeServerSession();
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
        <div className='max-w-2xl mx-auto px-2 min-h[55vh] mt-10'>
            {!cart || !cart.items ? (

                <div className='flex min-h-[400px] flex-col items-center justify-center rounded-lg border-dashed border p-8 text-center mt-20'>
                    <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
                        <ShoppingBagIcon className='size-10 text-primary'/>
                    </div>
                    <h2 className='mt-6 text-xl font-semibold'>Din kundvagn är tom</h2>
                    <p className='mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto'>
                        Du har inga produkter i din kundvagn :( lägg till produkter och kom tillbaka hit.
                    </p>
                    <Button asChild>
                        <Link href={"/shop"}>Köp Nu</Link>
                    </Button>
                </div>

            ):(

            <div className='flex flex-col gap-y-10'>
                <div className='mt-10 border-b-2 pb-4'>
                    <h1 className='text-2xl font-semibold text-center md:text-start mb-4'>Kundvagn</h1>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm">Delsumma:</p>
                                    <p>{formatPrice(totalPrice)}</p>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-1">
                                        <Truck size={16} />
                                        <p>Leverans:</p>
                                    </div>
                                    <p>{formatPrice(4900)}</p>
                                </div>
                                <div className="flex items-center justify-between font-bold">
                                    <p>Totalt:</p>
                                    <p>{formatPrice(totalPrice + 4900)}</p>
                                </div>
                            </div>
                </div>

                {cart?.items.map((item, index) => (
                    <CartItemCard key={index} item={item}/>
                ))}
                    <form action={checkout}>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isBusiness"
                                    name="isBusiness"
                                    value="true"
                                />
                                <Label htmlFor="isBusiness">Köper som företag</Label>
                            </div>
                            <CheckoutButton/>
                        </div>
                    </form>
            </div>
            )}
        </div>
    )
}

function CartItemCard ({item}: {item: Cart["items"][0]}) {
    return (
        <div className='flex border-b pb-4'>
            <div className='size-24 sm:size-32 relative'>
                <Image className='rounded-md object-cover' src={item.image} alt={item.name} fill />
            </div>
            <div className='ml-5 flex justify-between w-full font-medium'>
                <div className='flex flex-col'>
                    <p>{item.name}</p>
                    {item.color !== "" && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Färg:</span>
                            <div
                                className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                                style={{ backgroundColor: item.color }}
                            />
                        </div>
                    )}
                    {item.size !== "" && (
                        <div className='inline-flex gap-1 text-sm font-medium'>Storlek:
                            <p className='text-sm font-medium'>{item.size}</p>
                        </div>
                    )}

                </div>
                <div className='flex flex-col h-full justify-between'>
                    <div className='flex items-center gap-2'>
                        <p>{item.quantity} x</p>
                        <p>{formatPrice(item.price)}</p>
                    </div>
                    <p className='text-muted-foreground text-sm'>Totalt: {formatPrice(item.price * item.quantity)}</p>
                    <form action={deleteItem} className='text-end'>
                        <input type="hidden" name="itemId" value={item.id} />
                        <DeleteItemButton />
                    </form>
                </div>
            </div>
        </div>
    )
}

