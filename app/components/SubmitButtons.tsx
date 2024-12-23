"use client"
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";
import { useFormStatus } from "react-dom"

interface ButtonProps {
    text:string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function SubmitButton({ text, variant }: ButtonProps) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled variant={variant}>
                    <Loader2 className="animate-spin mr-2 size-4"/>
                    Please wait
                </Button>
            ): (
                <Button variant={variant} type="submit">{text}</Button>
            )}
        </>
    )
}


export function ShoppingBagButton() {
    const { pending } = useFormStatus();

    return (
        <>
        {pending ? (
            <Button
                size="lg"
                className='w-full mt-5'
                disabled
            >
                <Loader2 className='size-5 mr-4 animate-spin' />
                Vänta...
            </Button>
        ):(
        <Button
            type = "submit"
            size = "lg"
            className = 'w-full mt-5'
        >
            <ShoppingBag className='mr-4 size-5' />
            Lägg till i kundvagn
        </Button >
        )}
        </>
    )
}
export function DeleteItemButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <button
                    className='font-medium text-primary text-end'
                    disabled
                >
                    <Loader2 className='size-5 mr-4 animate-spin' />
                    Vänta...
                </button>
            ): (
                <button
                    type = "submit"
                    className='font-medium text-primary text-end'
                >
                    Ta bort
                </button >
            )}
        </>
    )
}

export function CheckoutButton () {
    const { pending } = useFormStatus();

    return (
        <>
        {pending ? (
            <Button disabled size="lg" className="w-full">
                <Loader2 className="animate-spin mr-2 size-5"/>
                Vänta...
            </Button>
        ):(
            <Button type="submit" size="lg" className="w-full">
                Gå till kassan
            </Button>
        )}
        </>
    )
}