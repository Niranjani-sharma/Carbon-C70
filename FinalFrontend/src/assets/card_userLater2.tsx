"use client"

// import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

export const description = "A stacked bar chart with a legend"

const chartData = [
  { month: "January", purchased: 186, redeemed: 80 },
  { month: "February", purchased: 305, redeemed: 200 },
  { month: "March", purchased: 237, redeemed: 120 },
  { month: "April", purchased: 73, redeemed: 190 },
  { month: "May", purchased: 209, redeemed: 130 },
  { month: "June", purchased: 214, redeemed: 140 },
]

const chartConfig = {
  purchased: {
    label: "Purchased",
    color: "hsl(120, 100%, 25%)",
  },
  redeemed: {
    label: "Redeemed",
    color: "hsl(140, 85.1%, 76.5%)",
  },
} satisfies ChartConfig

export function CardUserLater2() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Carbon Credits</CardTitle>
        <CardDescription>Data of the past 6 Months</CardDescription>
      </CardHeader>
      <CardContent >
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="purchased"
              stackId="a"
              fill="var(--color-purchased)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="redeemed"
              stackId="a"
              fill="var(--color-redeemed)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        
      </CardFooter>
    </Card>
  )
}
