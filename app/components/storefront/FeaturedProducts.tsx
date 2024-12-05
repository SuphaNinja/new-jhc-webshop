import prisma from "@/lib/prisma"
import ProductCard from "./ProductCard";
import { unstable_noStore as noStore } from 'next/cache'
import { Star } from "lucide-react";
async function getData() {
    const data = await prisma.product.findMany({
        where: { status: "published", isFeatured: true },
        orderBy: { createdAt: "desc" },
        take: 3
    })

    return data;
}

export async function FeaturedProducts() {
    noStore();
    const data = await getData();

    return (
    <div className="pt-16 border-t">
        <h2 className="text-2xl md:text-4xl font-bold inline-flex mb-2 md:mb-6 tracking-tight">
            Toppsäljare Hos Oss 
            <Star fill="yellow" className="md:size-10 size-8 ml-3"/>
        </h2>
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((item) => (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
    </div>
    )
}
