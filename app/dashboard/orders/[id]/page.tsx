import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { OrderDetails } from './OrderDetails'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

async function getData(id: string) {
    const data = await prisma.order.findUnique({
        where: { id: id },
        include: { items: true, User: true }
    })

    if (!data) notFound()

    return data
}

export default async function OrderPage({ params }: { params: { id: string } }) {
    const order = await getData(params.id)

    return (
        <div className="container mx-auto py-10">
            <div className='flex mb-4 items-center gap-4'>
                <Button asChild variant="outline" size="icon">
                    <Link href="/dashboard/orders">
                        <ChevronLeft className='size-4' />
                    </Link>
                </Button>
                <h1 className='text-xl  font-semibold tracking-tight'>Order Details</h1>
            </div>
            <OrderDetails order={order} />
        </div>
    )
}

