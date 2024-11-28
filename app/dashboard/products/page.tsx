import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableHeader, TableRow, Table, TableHead, TableBody, TableCell } from '@/components/ui/table'
import prisma from '@/lib/prisma'
import { CheckCircle2, MoreHorizontal, MoreVertical, PlusCircle, UserIcon, XCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

async function getData() {
    const data = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    return data
}   

export default async function ProductsPage() {
    const data = await getData();
    return (
        <>
            <div className='flex items-center justify-end'>
                <Button asChild className='flex items-center gap-x-2' variant={"outline"}>
                    <Link prefetch href='/dashboard/products/create'>
                        <PlusCircle className='size-3.5' />
                        <span>Add Product</span>
                    </Link>
                </Button>
            </div>
            <div>
                <Card className='mt-5'>
                    <CardHeader>
                        <CardTitle>Products</CardTitle>
                        <CardDescription>Manage your products</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Featured</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className='text-right'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {data.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <Image 
                                            alt="Product Image" 
                                            src={product.images[0]} 
                                            height={64} 
                                            width={64}
                                            className='rounded-md object-cover h-16 w-16'
                                        />
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.status}</TableCell>
                                    <TableCell>
                                        {product.isFeatured ? <CheckCircle2 className='size-4 text-green-500' /> : <XCircle className='size-4 text-red-500' />}
                                    </TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{new Intl.DateTimeFormat('en-US').format(product.createdAt)}</TableCell>
                                    <TableCell className='text-end'>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="ghost">
                                                    <MoreVertical className='size-4' />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align='end'>
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem asChild>
                                                    <Link prefetch href={`/dashboard/products/${product.id}`}>Edit</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link prefetch href={`/dashboard/products/${product.id}/delete`}>Delete</Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
  )
}
