"use client"

import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/formatPrice'
import { Cart } from '@/lib/interfaces'
import { ShoppingBagIcon, Truck } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { CartItemCard } from './CartItemCard'
import { Switch } from '@/components/ui/switch'
import { checkout } from '@/app/actions'
import { Label } from '@/components/ui/label'
import { CheckoutButton } from '../SubmitButtons'
import { Input } from '@/components/ui/input'

export default function ShoppingCart({ cart, totalPrice }: { cart: Cart | null, totalPrice: number }) {
    const [isBusiness, setIsBusiness] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [ vatNumber, SetVatNumber ] = useState('');
    const calculatePrice = (price: number) => {
        return isBusiness ? price * 0.75 : price;
    }

    const adjustedTotalPrice = calculatePrice(totalPrice);
    const shippingCost = 4900;
    const finalTotal = adjustedTotalPrice + shippingCost;

    return (
        <div className='max-w-2xl mx-auto px-2 min-h-[55vh] mt-10'>
            {!cart || !cart.items ? (
                <div className='flex min-h-[400px] flex-col items-center justify-center rounded-lg border-dashed border p-8 text-center mt-20'>
                    <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
                        <ShoppingBagIcon className='size-10 text-primary' />
                    </div>
                    <h2 className='mt-6 text-xl font-semibold'>Din kundvagn är tom</h2>
                    <p className='mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto'>
                        Du har inga produkter i din kundvagn :( lägg till produkter och kom tillbaka hit.
                    </p>
                    <Button asChild>
                        <Link href={"/shop"}>Köp Nu</Link>
                    </Button>
                </div>
            ) : (
                <div className='flex flex-col gap-y-10'>
                    <div className='mt-10 border-b-2 pb-4'>
                        <h1 className='text-2xl font-semibold text-center md:text-start mb-4'>Kundvagn</h1>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm">Delsumma:</p>
                                <p>{formatPrice(totalPrice * 0.75)}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm">Moms:</p>
                                <p>{formatPrice(totalPrice * 0.25)}</p>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1">
                                    <Truck size={16} />
                                    <p>Leverans:</p>
                                </div>
                                <p>{formatPrice(shippingCost)}</p>
                            </div>
                            <div className="flex items-center justify-between font-bold">
                                <p>Totalt:</p>
                                <p>{formatPrice(totalPrice)}</p>
                            </div>
                        </div>
                    </div>

                    {cart?.items.map((item, index) => (
                        <CartItemCard key={index} item={item} price={calculatePrice(item.price)} />
                    ))}
                    <form action={checkout}>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="isBusiness"
                                    checked={isBusiness}
                                    onCheckedChange={(checked) => {
                                        setIsBusiness(checked); 
                                    }}
                                />
                                <Label htmlFor="isBusiness">
                                    {isBusiness ? "Företagskund (exklusive moms)" : "Privatperson"}
                                </Label>
                            </div>
                            {isBusiness && (
                                <>
                                <div className="space-y-2">
                                    <Label htmlFor="vatNumber">Företagsnamn</Label>
                                    <Input
                                        id="companyName"
                                        name="companyName"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        placeholder="Företagsnamn"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vatNumber">Organisationsnummer</Label>
                                    <Input
                                        id="vatNumber"
                                        name="vatNumber"
                                        type='text'
                                        value={vatNumber}
                                        onChange={(e) => SetVatNumber(e.target.value)}
                                        placeholder="123456789001"
                                        required
                                    />
                                </div>
                                </>
                            )}
                            <input type="hidden" name="isBusiness" value={isBusiness.toString()} />
                            <CheckoutButton />
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
