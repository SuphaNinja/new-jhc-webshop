import { FeaturedProducts } from '@/app/components/storefront/FeaturedProducts'
import { ImageSlider } from '@/app/components/storefront/ImageSlider'
import { ProductForm } from '../ProductForm'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { ChevronLeft, StarIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatPrice } from '@/lib/formatPrice'
import { unstable_noStore as noStore } from 'next/cache'
import Container from '@/app/components/Container'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
async function getData(productId: string) {
    const data = await prisma.product.findUnique({
        where: { id: productId },
    })

    if (!data) return notFound()

    return data
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    let isLoggedIn = false;
    if (user) {
        isLoggedIn = true;
    }
    const { id } =await params
    const data = await getData(id);

    return (
        <Container>
            <Button asChild variant="outline" size="icon">
                <Link href={`/shop/${data.category}`}>
                    <ChevronLeft className='size-4' />
                </Link>
            </Button>
            <div className='grid md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6'>
                <ImageSlider images={data.images} />
                <div>
                    <h1 className='text-3xl font-extrabold tracking-tight'>{data.name}</h1>
                    <p className='text-3xl mt-2'>{isLoggedIn ? formatPrice(data.price) : "Logga in för att se pris"}</p>
                    <div className='mt-3 flex items-center gap-1'>
                        <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
                        <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
                        <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
                        <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
                        <StarIcon className='size-4 text-yellow-500 fill-yellow-500' />
                    </div>
                    <p className='text-base mt-6 text-muted-foreground'>{data.description}</p>
                    <ProductForm
                        productId={data.id}
                        colors={data.colors}
                        sizes={data.sizes}
                        isLoggedIn={isLoggedIn}
                    />
                </div>
            </div>
            <div className='mt-16'>
                <FeaturedProducts />
            </div>
        </Container>
    )
}

