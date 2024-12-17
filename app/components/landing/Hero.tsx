import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { unstable_noStore as noStore } from 'next/cache'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import image from "@/app/assets/Images/bannerjhc.jpg"

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
            <div className="relative h-[50vh] md:h-[80vh]">
                <Image
                    fill
                    alt="Banner Image"
                    src={image}
                    className="object-cover brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center md:items-end md:justify-start">
                    <div className="text-white p-4 md:p-8 rounded-md bg-[#416A98] bg-opacity-80 m-4 md:m-0 md:ml-44 md:mb-44 max-w-sm md:max-w-3xl">
                        <h1 className="text-3xl md:text-7xl font-semibold mb-2 text-center md:text-left">JHC Plåt & Bygg AB</h1>
                        <p className="text-sm md:text-lg text-center md:text-left font-medium leading-6 mt-4 md:mt-6">
                            Vi är specialister på tätskikt och takläggning med många års erfarenhet. Vi erbjuder hållbara lösningar för både privatpersoner och företag, alltid med fokus på kvalitet och precision.
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <Button asChild className="mt-6 md:mt-8 text-lg md:text-xl p-4 md:p-6 w-full md:w-1/2">
                                <Link href="/about">Läs mer om oss!</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}