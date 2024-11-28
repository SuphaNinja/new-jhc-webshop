import ProductCard from '@/app/components/storefront/ProductCard';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma'
import { $Enums } from '@prisma/client';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

async function getData(category: $Enums.ProductCategory) {
    const data = await prisma.product.findMany({
        where: { category: category, status: "published"},
        orderBy: {
            createdAt: "desc"
        }
    })

    if(!data) return notFound();

    return data;
}

export default async function CategoryPage({ params }: { params: { category: $Enums.ProductCategory }}) {
    const data = await getData(params.category);

    return (
        <section>
            <div className='flex items-center gap-4'>
                <Button asChild variant="outline" size="icon">
                    <Link href="/shop">
                        <ChevronLeft className='size-4' />
                    </Link>
                </Button>
                <h1 className='first-letter:uppercase font-semibold my-5 text-3xl'>
                    {params.category === "klader" ? "Kläder" : params.category}
                </h1>
            </div>
            
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}
