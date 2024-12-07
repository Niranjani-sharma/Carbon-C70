"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
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
  { month: "January", credits: 175, fill: "var(--color-january)" },
  { month: "February", credits: 150, fill: "var(--color-february)" },
  { month: "March", credits: 187, fill: "var(--color-march)" },
  { month: "April", credits: 123, fill: "var(--color-april)" },
  { month: "May", credits: 140, fill: "var(--color-may)" },
  { month: "June", credits: 170, fill: "var(--color-june)" },
]

const chartConfig = {
  credits: {
    label: "Credits",
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

export function CardWallet2() {
  const [totalCredits, setTotalCredits] = React.useState(0)

  React.useEffect(() => {
    const storedCredits = parseInt(localStorage.getItem("totalRedeemedCredits") || "0")
    const calculatedCredits = chartData.reduce((acc, curr) => acc + curr.credits, 0)
    setTotalCredits(calculatedCredits + storedCredits)
  }, [])

  return (
    <Card className="flex flex-col items-center">
      <CardHeader className="items-center pb-0 text-xl">
        <CardTitle>Total Credits Redeemed</CardTitle>
        <br />
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex justify-center">
        <ChartContainer
          config={chartConfig}
          className="aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="credits"
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
                          {totalCredits.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Credits
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
