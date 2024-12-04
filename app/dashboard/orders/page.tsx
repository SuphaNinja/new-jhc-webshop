import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatPrice } from '@/lib/formatPrice';
import prisma from '@/lib/prisma'
import Link  from 'next/link';
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache'
import { OrderTable } from '@/app/components/dashboard/orders/OrderTable';


async function getData () {
    const data = await prisma.order.findMany({
        include: { items: true, User: true },
        orderBy: {createdAt: 'desc'},
    });

    return data;
}
export default async function OrdersPage() {
    noStore();
    const data = await getData();

    return (
        <OrderTable data={data}/>
    )
}
