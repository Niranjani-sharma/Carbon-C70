"use client"

import * as React from "react"
// import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
  { month: "January", applications: 275, fill: "var(--color-january)" },
  { month: "February", applications: 200, fill: "var(--color-february)" },
  { month: "March", applications: 287, fill: "var(--color-march)" },
  { month: "April", applications: 173, fill: "var(--color-april)" },
  { month: "May", applications: 190, fill: "var(--color-may)" },
  { month: "June", applications: 220, fill: "var(--color-june)" },
]

const chartConfig = {
  applications: {
    label: "Applications",
  },
  january: {
    label: "January",
    color: "hsl(120, 100%, 15%)",
  },
  february: {
    label: "February",
    color: "hsl(120, 100%, 35%)",
  },
  march: {
    label: "March",
    color: "hsl(120, 100%, 45%)",
  },
  april: {
    label: "April",
    color: "hsl(126, 100%, 65%)",
  },
  may: {
    label: "May",
    color: "hsl(128, 100%, 5%)",
  },
  june: {
    label: "June",
    color: "hsl(130, 100%, 25%)",
  },
} satisfies ChartConfig

export function CardUserLater() {
  const totalApplications = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.applications, 0)
  }, [])

  return (
    <Card className="flex flex-col w-[400px]">
      <CardHeader className="items-start pb-0">
        <CardTitle>Number of Applications Made</CardTitle>
        <CardDescription>Data of the past 6 Months</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="applications"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalApplications.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Applications
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        
      </CardFooter>
    </Card>
  )
}
