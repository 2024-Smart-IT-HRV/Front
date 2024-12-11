"use client";

//hrv 차트입니다
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";


// 차트 데이터 DB
const datasets = {
  
  EegData: [
    { time: "00:00",  current: 36 },
    { time: "00:10",  current: 283 },
    { time: "00:20",  current: 312 },
    { time: "00:30",  current: 124 },
    { time: "00:40",  current: 135 },
    { time: "00:50",  current: 257 },
    { time: "01:00",  current: 295 },
    { time: "01:10",  current: 366 },
    { time: "01:20",  current: 116 },
    { time: "01:30",  current: 383 },
    { time: "01:40",  current: 366 },
    { time: "01:50",  current: 335 }
],
  
} as const;


type DatasetKey = keyof typeof datasets;


const chartConfig = {
  // former: {
  //   label: "이전 기록",
  //   color: "hsl(var(--chart-3))",
  // },
  current: {
    label: "현재 기록",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function EegChart({ datasetKey }: { datasetKey: DatasetKey }) {  const [selectedDataset] = React.useState<DatasetKey>(datasetKey);


  // 선택한 데이터셋 가져오기
  const filteredData = [...datasets[selectedDataset]]; // readonly 배열을 일반 배열로 변환


  return (
    <>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">

          <CardTitle>{selectedDataset} 차트</CardTitle>
          <CardDescription>선택한 데이터셋의 차트를 보여줍니다.</CardDescription>
        </div>
      </CardHeader>
    
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-former)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-former)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-current)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-current)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return value;
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="current"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-current)"
              stackId="a"
            />
            <Area
              dataKey="former"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-former)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>

      </>
  );
}