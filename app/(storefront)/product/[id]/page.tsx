import { FeaturedProducts } from '@/app/components/storefront/FeaturedProducts';
import { ImageSlider } from '@/app/components/storefront/ImageSlider';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma'
import { ChevronLeft, ShoppingBag, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

async function getData(productId: string) {
    const data = await prisma.product.findUnique({
        where: { id: productId },
    })

    if(!data) return notFound();

    return data
}
export default async function ProductPage({params}: {params: {id: string}}) {
    const data = await getData(params.id);

    return (
        <>
            <Button asChild variant="outline" size="icon">
                <Link href={`/shop/${data.category}`}>
                    <ChevronLeft className='size-4' />
                </Link>
            </Button>
            <div className='grid md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6'>
                <ImageSlider images={data.images}/>
                <div>
                    <h1 className='text-3xl font-extrabold tracking-tight'>{data.name}</h1>
                    <p className='text-3xl mt-2'>${data.price}</p>
                    <div className='mt-3 flex items-center gap-1'>
                        <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
                        <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
                        <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
                        <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
                        <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
                    </div>
                    <p className='text-base mt-6 text-muted-foreground'>{data.description}</p>
                    {data.colors.length > 0 && (
                        <div className='flex gap-2 mt-5'>
                            <p>Colors: </p>
                            {data.colors.map((color, index) => (
                                <div key={index} className='flex items-center gap-2'>
                                    <div className='w-6 h-6 rounded-full' style={{ backgroundColor: color }}></div>
                                </div>
                            ))}
                        </div>
                    )}
                    {data.sizes.length > 0 && (
                        <div className='flex items-center gap-2 mt-5'>
                            <p>Sizes: </p>
                            {data.sizes.map((size, index) => (
                                <div key={index} className='flex items-center gap-1'>
                                    <Button size="icon" variant={"ghost"}>{size}</Button>
                                </div>
                            ))}
                        </div>
                    )}
                    <Button size="lg" className='w-full mt-5'>
                        <ShoppingBag className='mr-4 size-5'/>
                        Add to cart
                    </Button>
                </div>
                
            </div>
            <div className='mt-16'>
                <FeaturedProducts />
            </div>
        </>
    )
}
