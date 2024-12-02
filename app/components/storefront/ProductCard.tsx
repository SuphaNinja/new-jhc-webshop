import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { formatPrice } from '@/lib/formatPrice'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface iAppProps {
    product: Product
}
export default function ProductCard({ product }: iAppProps) {
    return (
        <div>
            <Carousel className='w-full mx-auto'>
                <CarouselContent>
                    {product.images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className='relative h-[330px]'>
                                <Image 
                                    src={image} 
                                    alt={product.name} 
                                    fill
                                    className='object-cover rounded-lg object-center size-full' 
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='ml-16'/>
                <CarouselNext className='mr-16' />
            </Carousel>
            <div className='flex justify-between items-center'>
                <h1 className='font-semibold text-xl'>{product.name}</h1>
                <h3 className='inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xl font-medium text-primary ring-inset ring-primary/10'>
                    {formatPrice(product.price)}
                </h3>
            </div>
            <p className='text-mt-2 text-gray-600 text-sm line-clamp-2'>
                {product.description}
            </p>
            <Button className='w-full mt-5' asChild>
                <Link href={`/product/${product.id}`}>
                    Learn more
                </Link>
            </Button>
        </div>
    )
}


export function LoadingProductCard() {
    return (
        <div className='flex flex-col'>
            <Skeleton className='h-[330px] w-full'/>
            <div className='flex flex-col mt-2 gap-y-2'>
                <Skeleton className='h-4 w-full'/>
                <Skeleton className='h-6 w-full' />
            </div>
            <Skeleton className='w-full h-10 mt-5'/>
        </div>
    )
}
