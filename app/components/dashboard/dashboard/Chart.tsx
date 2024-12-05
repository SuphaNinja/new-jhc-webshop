"use client"

import React, { useState, useMemo } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from '@/lib/formatDate'
import { formatPrice } from '@/lib/formatPrice'

interface ChartProps {
    data: { date: string; revenue: number }[];
}

type TimeRange = '1W' | '1M' | 'ALL';

export function RevenueChart({ data }: ChartProps) {
    const [timeRange, setTimeRange] = useState<TimeRange>('ALL');

    const filteredData = useMemo(() => {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        switch (timeRange) {
            case '1W':
                return data.filter(item => new Date(item.date) >= oneWeekAgo);
            case '1M':
                return data.filter(item => new Date(item.date) >= oneMonthAgo);
            default:
                return data;
        }
    }, [data, timeRange]);

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                    {timeRange === "ALL" ? "All time": timeRange === "1W" ? "Last week": "Last month" } revenue in Swedish Krona (SEK)
                </CardDescription>
                <div className="flex space-x-2 mt-2">
                    <Button
                        variant={timeRange === '1W' ? 'default' : 'outline'}
                        onClick={() => setTimeRange('1W')}
                    >
                        1 Week
                    </Button>
                    <Button
                        variant={timeRange === '1M' ? 'default' : 'outline'}
                        onClick={() => setTimeRange('1M')}
                    >
                        1 Month
                    </Button>
                    <Button
                        variant={timeRange === 'ALL' ? 'default' : 'outline'}
                        onClick={() => setTimeRange('ALL')}
                    >
                        All Time
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-180px)]">
                <ChartContainer
                    config={{
                        revenue: {
                            label: "Revenue",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                    className="h-full w-full"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filteredData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={formatDate}
                                interval="preserveStartEnd"
                            />
                            <YAxis/>
                            <ChartTooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-background border border-border p-2 rounded-md shadow-md">
                                                <p className="font-medium">{formatDate(payload[0].payload.date)}</p>
                                                <p className="text-muted-foreground">
                                                    Revenue: {(payload[0].value as number) } kr
                                                </p>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="var(--color-revenue)"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

