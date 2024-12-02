import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/formatPrice';
import prisma from '@/lib/prisma'
import React from 'react'

async function getData() {
    const data = await prisma.order.findMany({
        select: {
            amount:true,
            id:true,
            User: {
                select: {
                    firstName: true,
                    email: true,
                    profileImage: true
                }
            }
        },
        orderBy: { createdAt:"desc" },
        take: 7
    });

    return data;
};
export async function RecentSales() {
    const data = await getData();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-8'>
                {data.map((item) => (
                    <div key={item.id} className='flex items-center gap-4'>
                        <Avatar className="hidden sm:flex size-9">
                            <AvatarImage src={item.User?.profileImage} alt="avatar image"/>
                            <AvatarFallback>{item.User?.firstName.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className='grid gap-1'>
                            <p className='text-sm font-medium'>{item.User?.firstName}</p>
                            <p className='text-sm text-muted-foreground'>{item.User?.email}</p>
                        </div>
                        <p className='ml-auto font-medium'>+{formatPrice(item.amount)}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
