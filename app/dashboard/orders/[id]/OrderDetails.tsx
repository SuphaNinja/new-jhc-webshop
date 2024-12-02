import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/formatDate'
import { Order, OrderItem } from '@prisma/client'
import { formatPrice } from '@/lib/formatPrice'

export function OrderDetails({order}: any) {

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={order.User?.profileImage} alt={order.User?.firstName} />
                            <AvatarFallback>{order.User?.firstName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-lg font-semibold">{order.User?.firstName} {order.User?.lastName}</p>
                            <p className="text-sm text-gray-500">{order.User.email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">Status:</span>
                            <Badge variant={order.status === 'paid' ? 'destructive' : 'secondary'}>
                                {order.status}
                            </Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Amount:</span>
                            <span>{formatPrice(order.amount)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Date:</span>
                            <span>{formatDate(order.createdAt) }</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6 ">
                        {order.items.map((item: OrderItem) => (
                            <div key={item.id} className="flex space-x-4 border-b py-2">
                                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{item.name}</h3>
                                        <p className="ml-4">{formatPrice(item.price)}</p>
                                    </div>
                                    <div className="mt-1 text-sm text-gray-500">
                                        {item.size !== "" && `Size: ${item.size}`}
                                        {item.color && item.color !== "" &&  (
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">Color:</span>
                                                <div
                                                    className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                                                    style={{ backgroundColor: item.color }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="ml-auto text-sm">
                                        <p className="text-gray-500">
                                            Subtotal: {formatPrice(item.price * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

