"use client"
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
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