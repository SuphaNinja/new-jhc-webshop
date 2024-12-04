import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatPrice } from '@/lib/formatPrice';
import prisma from '@/lib/prisma'
import Link  from 'next/link';
import React from 'react'
import { unstable_noStore as noStore } from 'next/cache'


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
        <Card>
            <CardHeader className='px-7'>
                <CardTitle>Orders</CardTitle>
                <CardDescription>Recent orders from your store!</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className='text-right'>Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <p className='font-medium'>{item.User?.firstName} {item.User?.lastName}</p>
                                    <p className='hidden md:flex text-sm text-muted-foreground'>{item.User?.email}</p>
                                </TableCell>
                                <TableCell>{item.taxIdValue && "Company" || "Private"}</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>
                                    <Link 
                                        className='text-sm font-medium hover:underline' 
                                        href={`/dashboard/orders/${item.id}`}
                                    >
                                        ({item.items.length}) View
                                    </Link>
                                </TableCell>
                                <TableCell>{new Intl.DateTimeFormat("en-US").format(item.createdAt)}</TableCell>
                                <TableCell className='text-right'>{formatPrice(item.amount)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
