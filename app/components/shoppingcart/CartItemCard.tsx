import Image from "next/image"
import { DeleteItemButton } from "../SubmitButtons"
import { formatPrice } from "@/lib/formatPrice"
import { deleteItem } from "@/app/actions"
import { Cart } from "@/lib/interfaces"

export function CartItemCard({ item, price }: { item: Cart["items"][0], price: number }) {

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
                        <p>{formatPrice(price)}</p>
                    </div>
                    <p className='text-muted-foreground text-sm'>Totalt: {formatPrice(price * item.quantity)}</p>
                    <form action={deleteItem} className='text-end'>
                        <input type="hidden" name="itemId" value={item.id} />
                        <DeleteItemButton />
                    </form>
                </div>
            </div>
        </div>
    )
}