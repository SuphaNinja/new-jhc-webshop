import React from 'react'
import { DashboardStats } from '../components/dashboard/DashboardStats'
import { RecentSales } from '../components/dashboard/RecentSales'
import { RevenueChart } from '../components/dashboard/Chart'
import prisma from '@/lib/prisma'
import { unstable_noStore as noStore } from 'next/cache'

async function getData() {
    const data = await prisma.order.findMany({
        select: {
            amount:true,
            createdAt:true
        },
        orderBy: { createdAt:"desc" },
    })

    const result = data.map((item) => ({
        date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
        revenue: item.amount / 100
    }));

    return result;
}



export default async function Dashboard() {
    noStore();
    const data = await getData()

    return (
        <>
        <DashboardStats />
        
        <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10'>
            <RevenueChart data={data}/>
            <RecentSales />
        </div>
        </>
    )
}
