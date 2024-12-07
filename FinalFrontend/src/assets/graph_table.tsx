"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

export const description = "Credit Purchase History"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(120, 100%, 25%)",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(120, 100%, 75%)",
  },
} satisfies ChartConfig

// Mock API function
const fetchChartData = async (timeRange: string): Promise<any[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate mock data based on time range
      const now = new Date()
      const data = []
      const daysToGenerate = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
      
      for (let i = daysToGenerate - 1; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)
        data.push({
          date: date.toISOString().split('T')[0],
          bought: Math.floor(Math.random() * 100) + 100, // Random number between 100 and 199
          redeemed: Math.floor(Math.random() * 80) + 20 // Random number between 20 and 99
        })
      }
      resolve(data)
    }, 1000) // Simulate 1 second delay
  })
}

export function Graph() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const [chartData, setChartData] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await fetchChartData(timeRange)
        setChartData(data)
      } catch (err) {
        setError("Failed to fetch chart data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [timeRange])

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Credit Purchase History</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {isLoading ? (
          <Skeleton className="h-[250px] w-full" />
        ) : error ? (
          <div className="flex h-[250px] items-center justify-center text-destructive">
            {error}
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillBought" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(120, 100%, 25%)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(120, 100%, 25%)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillRedeemed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(120, 100%, 75%)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(120, 100%, 75%)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value} Credits`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent 
                  labelFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                  }}
                />}
              />
              <Area
                type="monotone"
                dataKey="redeemed"
                stackId="1"
                stroke="hsl(120, 100%, 75%)"
                fill="url(#fillRedeemed)"
              />
              <Area
                type="monotone"
                dataKey="bought"
                stackId="1"
                stroke="hsl(120, 100%, 25%)"
                fill="url(#fillBought)"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}