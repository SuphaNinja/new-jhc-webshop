import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import ProductCard from '@/app/components/storefront/ProductCard';
import Container from '@/app/components/Container';
import { FeaturedProducts } from '@/app/components/storefront/FeaturedProducts';
import { Package, Star } from 'lucide-react';

async function getData() {
  const data = await prisma.product.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
  });

  return data;
}

export default async function ShopPage() {
  noStore();
  const data = await getData();

  return (
    <Container>
      <header className="my-12 text-center">
        <h1 className="text-4xl font-bold mb-6 text-primary">Vår Webshop</h1>

        <nav className="inline-flex items-center justify-center flex-wrap gap-6 p-4 bg-secondary rounded-lg shadow-md">
          <Link
            href="/shop/klader"
            className="text-lg font-medium text-secondary-foreground hover:text-primary transition-colors duration-200 ease-in-out"
          >
            Kläder
          </Link>
          <span className="text-secondary-foreground/50">|</span>
          <Link
            href="/shop/verktyg"
            className="text-lg font-medium text-secondary-foreground hover:text-primary transition-colors duration-200 ease-in-out"
          >
            Verktyg
          </Link>
          <span className="text-secondary-foreground/50">|</span>
          <Link
            href="/shop/material"
            className="text-lg font-medium text-secondary-foreground hover:text-primary transition-colors duration-200 ease-in-out"
          >
            Material
          </Link>
        </nav>
      </header>
      <div className='flex flex-col gap-12'>
        <FeaturedProducts/>
        <div>
          <h2 className="text-2xl md:text-4xl font-bold inline-flex mb-2 md:mb-6 tracking-tight">
            Alla Produkter
            <Package className="md:size-10 size-8 ml-3" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
      
      
    </Container>
  )
}

