import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSignIcon, PartyPopper, PartyPopperIcon, ShoppingBag, ShoppingBagIcon, User2, User2Icon } from 'lucide-react'
import React from 'react'

export default function Dashboard() {
  return (
    <>
    <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4 '>
        <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle>Total Revenue</CardTitle>
                <DollarSignIcon className='h-4 w-4 text-green-500'/>
            </CardHeader>
            <CardContent>
                <p className='text-2xl font-bold'>$45,231</p>
                <p className='text-xl text-muted-foreground'>Based on 100 charges</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle>Total Sales</CardTitle>
                <ShoppingBag className='h-4 w-4 text-blue-500' />
            </CardHeader>
            <CardContent>
                <p className='text-2xl font-bold'>+50</p>
                <p className='text-xl text-muted-foreground'>Sales</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle>Total Products</CardTitle>
                <PartyPopper className='h-4 w-4 text-indigo-500' />
            </CardHeader>
            <CardContent>
                <p className='text-2xl font-bold'>+50</p>
                <p className='text-xl text-muted-foreground'>Total products created</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle>Total Users</CardTitle>
                <User2 className='h-4 w-4 text-orange-500' />
            </CardHeader>
            <CardContent>
                <p className='text-2xl font-bold'>5</p>
                <p className='text-xl text-muted-foreground'>Total users signed up</p>
            </CardContent>
        </Card>
    </div>
    
    <div className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10'>
        <Card className='xl:col-span-2'>
            <CardHeader>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>Recent transaction from your store</CardDescription>
            </CardHeader>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-8'>
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className='flex items-center gap-4'>
                        <Avatar className="hidden sm:flex size-9">
                            <AvatarFallback>SR</AvatarFallback>
                        </Avatar>
                        <div className='grid gap-1'>
                            <p className='text-sm font-medium'>Sid Rico</p>
                            <p className='text-sm text-muted-foreground'>sidricobjork@gmail.com</p>
                        </div>
                        <p className='ml-auto font-medium'>+$1,999.00</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
    </>
  )
}
