import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { unstable_noStore as noStore } from 'next/cache'
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
                    src="https://ci3.googleusercontent.com/mail-img-att/AGAZnRq5H6YsVhyFhUax6jsJRqS2qGL90JhezLyhhC6ku0QZmN0t3G_sHDxX7eSFfPBbQ9Xvzq47zezJpKWcCG9f2Tjyzgt-2hIIyXL_0bifcxqIqLtmfWUDHkxJziPKlnn_Ih7anNaRyq2FDAzSn5qET60VbPqusDcOQV6F2beWbs_NhDdBntMSmpWNcV8TEmPWdQTUj98p_d9R1KMnJ2SVehmPZ10JnpzzFYCu-cNMq__7GYIY9IAPF4iYD-RS9dONyCies3sIjdLEj-cveGoHcpE2j76A92MzmLUTdB_tsg7qWWm7CGQSvg7PlJnoDCSeY_7tf_TJFv9qrUTi1Sqktg7CHCAtkXLHXEl4QrQOmKCBz1T6280CLUUf0TdYH-eJGxFST_h1W8ZUUdPpRVuIIHmW3xlFv0R1rwuknCEtlriX_Qy6EPF3EAL3jJjKxjD2pKs-Fjwn1DiWGp8rhBcJcqn43SRUS8zZKTZbItzUdkGbrcaheUmzz0HK-rp3JDjMD3Mqek37z2xBnFKIJzaxGk6RDtZgz-12ramuDp41nnAEcoPvglMy6v9TY_m7u7xkb-elquu_abxW3xggW8xwGvLrKgMsifMuDMk2wneRpxilA6QsWhGpq1GeZhBKqPhcX4IDshdo0YNBZz6V4VlrKHGCnK8DwugmKcXDj3xwYkvswhCcY-GKvZ6C780jY0lnp1FyCMKNo_KP7MJQO7b2s8HPD_DckKYCQuCe2ktkOS5Y_33GBkNaYBcWM6WUHhXCcEz9M4IQvAfxVcJayKsfrYRM1H0niRpjOGRXjPqpnivNPhUBI-JVYgUyGVYWctYiMAdV3m-ztiwUSccoG0P1-1Vz8zFpvILq-Zvxihcl8CAMTxR9c4omQt3YGkZU0MK-xrsJk05wNLLElCFxGfaULVGgnzj9KEIYSRxYOEN921b8Om5LThbcBH1DtVoag2uKQIen0-FNSrn-CtrufkN8-2vs2wuGgcTsctKNc5PHpf3KhENpBlrdNY8WIxFZlSPnbh-3SXN-aaL_vT2_tsVq8zgtmWzHkw5ZlCWwFRT5e6P6KhBIBXDyra1vSor5gL_RLXVu9bQolTjN-AO9f6wqZIb7OqXBwsr5zgVs77ZXLk7sBPO79PLlMkI967LKHtb_2GaZ7g=s0-l75-ft"
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