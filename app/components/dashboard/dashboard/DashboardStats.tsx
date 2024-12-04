import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice";
import prisma from "@/lib/prisma";
import { DollarSignIcon, PartyPopper, ShoppingBag, User2 } from "lucide-react";

async function getData () {
    const [user, products, sales] = await Promise.all([
        prisma.user.findMany({
            select: { id: true }
        }),
        prisma.product.findMany({
            select: { id: true }
        }),
        prisma.order.findMany({
            select: { amount: true }
        })
    ]);

    return {
        user,
        products,
        sales
    };
};
export async function DashboardStats() {
    const { user, products, sales } = await getData();

    const totalRevenue = sales.reduce((acc,currentValue) => acc + currentValue.amount, 0);

    return (
        <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 '>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle>Total Revenue</CardTitle>
                    <DollarSignIcon className='h-4 w-4 text-green-500' />
                </CardHeader>
                <CardContent>
                    <p className='text-2xl font-bold'>{formatPrice(totalRevenue)}</p>
                    <p className='text-xl text-muted-foreground'>Based on {sales.length} charges</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle>Total Sales</CardTitle>
                    <ShoppingBag className='h-4 w-4 text-blue-500' />
                </CardHeader>
                <CardContent>
                    <p className='text-2xl font-bold'>+{sales.length}</p>
                    <p className='text-xl text-muted-foreground'>Sales</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle>Total Products</CardTitle>
                    <PartyPopper className='h-4 w-4 text-indigo-500' />
                </CardHeader>
                <CardContent>
                    <p className='text-2xl font-bold'>{products.length}</p>
                    <p className='text-xl text-muted-foreground'>Total products created</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                    <CardTitle>Total Users</CardTitle>
                    <User2 className='h-4 w-4 text-orange-500' />
                </CardHeader>
                <CardContent>
                    <p className='text-2xl font-bold'>{user.length}</p>
                    <p className='text-xl text-muted-foreground'>Total users signed up</p>
                </CardContent>
            </Card>
        </div>
    )
}