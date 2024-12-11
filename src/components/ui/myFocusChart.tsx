"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart"
const chartData = [
  { week: "월요일", focus: 187, fill: "var(--color-월요일)" },
  { week: "화요일", focus: 200, fill: "var(--color-화요일)" },
  { week: "수요일", focus: 275, fill: "var(--color-수요일)" },
  { week: "목요일", focus: 173, fill: "var(--color-목요일)" },
  { week: "금요일", focus: 90, fill: "var(--color-금요일)" },
  { week: "토요일", focus: 90, fill: "var(--color-토요일)" },
  { week: "일요일", focus: 90, fill: "var(--color-일요일)" },
]

const chartConfig = {
  focus: {
    label: "집중도",
  },
  월요일: {
    label: "월요일",
    color: "hsl(var(--chart-3))",
  },
  화요일: {
    label: "화요일",
    color: "hsl(var(--chart-4))",
  },
  수요일: {
    label: "수요일",
    color: "hsl(var(--chart-5))",
  },
  목요일: {
    label: "목요일",
    color: "hsl(var(--chart-6))",
  },
  금요일: {
    label: "금요일",
    color: "hsl(var(--chart-7))",
  },
  토요일: {
    label: "토요일",
    color: "hsl(var(--chart-8))",
  },
  일요일: {
    label: "일요일",
    color: "hsl(var(--chart-9))",
  },
} satisfies ChartConfig

export function MyFocusChart() {
  return (
    <>
      <CardHeader>
        <CardTitle>2024년 12월 둘째주</CardTitle>
        <CardDescription>집중도</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="focus"
              strokeWidth={2}
              radius={8}
              // activeIndex={1}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          지난 주 대비 집중도 5.2% 향상 <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </>
  )
}


