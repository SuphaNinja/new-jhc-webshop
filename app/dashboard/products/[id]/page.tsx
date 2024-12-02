import { EditForm } from "@/app/components/dashboard/EditForm";
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { unstable_noStore as noStore } from 'next/cache'

async function getData(productId: string) {
    const data = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });

    if(!data) {
        return notFound()
    };

    return data;
}
export default async function EditProductPage({params}: {params: {id: string}}) {
    noStore();
    const data = await getData(params.id)

    return (
        <div>
            <EditForm data={data} />
        </div>
    )
}