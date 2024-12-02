import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatPrice } from '@/lib/formatPrice';
import prisma from '@/lib/prisma'
import Link  from 'next/link';
import React from 'react'

async function getData () {
    const data = await prisma.order.findMany({
        select: {
            amount: true,
            createdAt: true,
            status: true,
            id: true,
            items: true,
            User: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    profileImage: true
                }
            }
        },
        
        orderBy: {
            createdAt: 'desc'
        }
    });

    return data;
}
export default async function OrdersPage() {
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
                                <TableCell>Order</TableCell>
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
