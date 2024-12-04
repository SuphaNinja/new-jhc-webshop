import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { unstable_noStore as noStore } from 'next/cache'

async function getData () {
    const data = await prisma.banner.findMany({
        orderBy: { createdAt: "desc" },
    })
    return data;
}

export async function Hero() {
    const data = await getData();
    
    return (
        <>
            <div className="relative h-[50vh] lg:h-[60vh]">
                <Image
                    fill
                    alt="Banner Image"
                    src={data[0].imageString}
                    className="object-cover brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center max-w-sm text-white p-4 bg-black bg-opacity-20 rounded-lg">
                        <h1 className="text-4xl font-bold mb-2">JHC Plåt & Bygg AB</h1>
                        <p className="text-lg font-medium leading-6 mt-4">Takläggare av värdsklass i Sverige med över 20 års erfarenhet bla bla bla </p>
                    </div>
                </div>
            </div>
        </>
    )
}