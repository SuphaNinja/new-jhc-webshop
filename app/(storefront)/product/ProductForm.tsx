'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { addItem } from '@/app/actions'
import { ShoppingBagButton } from '@/app/components/SubmitButtons'

interface ProductFormProps {
    productId: string
    colors: string[]
    sizes: string[]
}

export function ProductForm({ productId, colors, sizes }: ProductFormProps) {
    const [selectedColor, setSelectedColor] = useState<string>('')
    const [selectedSize, setSelectedSize] = useState<string>('')
    const [quantity, setQuantity] = useState(1)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (formData: FormData) => {
        // Reset previous errors
        setError(null)

        // Check if colors exist and a color is selected
        if (colors.length > 0 && !selectedColor) {
            setError('Please select a color')
            return
        }

        // Check if sizes exist and a size is selected
        if (sizes.length > 0 && !selectedSize) {
            setError('Please select a size')
            return
        }

        // Append form data
        formData.append('color', selectedColor)
        formData.append('size', selectedSize)
        formData.append('quantity', quantity.toString())
        formData.append('productId', productId)

        // Submit the form
        await addItem(formData)
    }

    return (
        <form action={handleSubmit}>
            {colors.length > 0 && (
                <div className='flex gap-2 mt-5'>
                    <p>Colors: </p>
                    {colors.map((color, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-6 h-6 rounded-full ${selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                        />
                    ))}
                </div>
            )}
            {sizes.length > 0 && (
                <div className='flex items-center gap-2 mt-5'>
                    <p>Sizes: </p>
                    {sizes.map((size, index) => (
                        <Button
                            key={index}
                            type="button"
                            size="sm"
                            variant={selectedSize === size ? "default" : "outline"}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </Button>
                    ))}
                </div>
            )}
            <div className='flex items-center gap-2 mt-5'>
                <p>Quantity: </p>
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                    -
                </Button>
                <span>{quantity}</span>
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(prev => prev + 1)}
                >
                    +
                </Button>
            </div>
            {error && (
                <div className="text-red-500 mt-2">
                    {error}
                </div>
            )}
            <ShoppingBagButton />
        </form>
    )
}