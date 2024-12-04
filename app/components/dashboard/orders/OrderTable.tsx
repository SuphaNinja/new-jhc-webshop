"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Order, OrderItem, User } from '@prisma/client'
import Link from 'next/link'
import { formatPrice } from '@/lib/formatPrice'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Building, Calendar, DollarSign } from 'lucide-react'

interface OrderTableProps {
    data: (Order & { User: User; items: OrderItem[] })[];
}

type SortField = 'company' | 'amount' | 'date'
type SortOrder = 'asc' | 'desc'

export function OrderTable({ data }: OrderTableProps) {
    const [sortField, setSortField] = useState<SortField>('date')
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

    const sortedData = [...data].sort((a, b) => {
        if (sortField === 'company') {
            return sortOrder === 'asc'
                ? Number(a.isCompany) - Number(b.isCompany)
                : Number(b.isCompany) - Number(a.isCompany)
        } else if (sortField === 'amount') {
            return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount
        } else {
            return sortOrder === 'asc'
                ? a.createdAt.getTime() - b.createdAt.getTime()
                : b.createdAt.getTime() - a.createdAt.getTime()
        }
    })

    const toggleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortOrder('asc')
        }
    }

    return (
        <Card>
            <CardHeader className='px-7'>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Orders</CardTitle>
                        <CardDescription>Recent orders from your store!</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => toggleSort('company')}>
                            <Building className="mr-2 h-4 w-4" />
                            Company
                            {sortField === 'company' && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => toggleSort('date')}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Date
                            {sortField === 'date' && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => toggleSort('amount')}>
                            <DollarSign className="mr-2 h-4 w-4" />
                            Amount
                            {sortField === 'amount' && <ArrowUpDown className="ml-2 h-4 w-4" />}
                        </Button>
                    </div>
                </div>
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
                        {sortedData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <p className='font-medium'>
                                        {item.isCompany ? item.companyName : item.User?.firstName + " " + item.User?.lastName}
                                    </p>
                                    <p className='hidden md:flex text-sm text-muted-foreground'>{item.User?.email}</p>
                                </TableCell>
                                <TableCell>{item.isCompany ? "Company" : "Private"}</TableCell>
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

