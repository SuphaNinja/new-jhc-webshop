import ProductCard from '@/app/components/storefront/ProductCard';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma'
import { $Enums } from '@prisma/client';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import Container from '@/app/components/Container';
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
    noStore();
    const data = await getData(params.category);

    return (
        <Container>
            <header className="mb-8">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 py-6 border-b">
                        <Button asChild variant="ghost" size="icon" className="shrink-0">
                            <Link href="/shop" aria-label="Back to shop">
                                <ChevronLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {params.category === "klader" ? "Kläder" :
                                params.category === "verktyg" ? "Verktyg" :
                                    params.category === "material" ? "Material" :
                                        params.category.charAt(0).toUpperCase() + params.category.slice(1)}
                        </h1>
                    </div>
                </div>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </Container>
    )
}
