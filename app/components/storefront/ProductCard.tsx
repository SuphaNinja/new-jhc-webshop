import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
import { formatPrice } from '@/lib/formatPrice'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface iAppProps {
    product: Product
}
export default async function ProductCard({ product }: iAppProps) {

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    return (
        <Card className="w-full max-w-sm mx-auto overflow-hidden">
            <CardContent className="p-0">
                <Carousel className="w-full">
                    <CarouselContent>
                        {product.images.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="relative aspect-square">
                                    <Image
                                        src={image}
                                        alt={`${product.name} - Image ${index + 1}`}
                                        fill
                                        className="object-cover rounded-t-lg"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                </Carousel>
            </CardContent>
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h2 className="text-xl font-semibold line-clamp-2">{product.name}</h2>
                        <Link 
                            href={`/shop/${product.category}`} 
                            className='first-letter:uppercase hover:underline text-muted-foreground'>{product.category !== "klader" ? product.category : "Kläder"}
                        </Link>
                    </div>
                    <p className={`${user ? "text-lg": "text-sm"} font-medium`}>{!user ? ("Logga in för att se priser"): (formatPrice(product.price))}</p>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {product.description}
                </p>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={`/product/${product.id}`}>
                        Köp nu
                    </Link>
                </Button>
            </CardFooter>
        </Card>
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
