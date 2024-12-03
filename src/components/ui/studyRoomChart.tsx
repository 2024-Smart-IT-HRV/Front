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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

// 차트 데이터 DB
const datasets = {
  HrvData: [
    { time: "00:00", former: 240, current: 366 },
    { time: "00:10", former: 52, current: 287 },
    { time: "00:20", former: 155, current: 313 },
    { time: "00:30", former: 230, current: 128 },
    { time: "00:40", former: 120, current: 139 },
    { time: "00:50", former: 129, current: 257 },
    { time: "01:00", former: 186, current: 295 },
    { time: "01:10", former: 149, current: 366 },
    { time: "01:20", former: 142, current: 116 },
    { time: "01:30", former: 165, current: 383 },
    { time: "01:40", former: 93, current: 366 },
    { time: "01:50", former: 99, current: 335 }
],
  EegData: [
    { time: "00:00", former: 313, current: 36 },
    { time: "00:10", former: 277, current: 283 },
    { time: "00:20", former: 15, current: 312 },
    { time: "00:30", former: 23, current: 124 },
    { time: "00:40", former: 120, current: 135 },
    { time: "00:50", former: 129, current: 257 },
    { time: "01:00", former: 186, current: 295 },
    { time: "01:10", former: 149, current: 366 },
    { time: "01:20", former: 142, current: 116 },
    { time: "01:30", former: 165, current: 383 },
    { time: "01:40", former: 93, current: 366 },
    { time: "01:50", former: 99, current: 335 }
],
  FocusData: [
    { time: "00:00", former: 240, current: 366 },
    { time: "00:10", former: 52, current: 287 },
    { time: "00:20", former: 155, current: 313 },
    { time: "00:30", former: 230, current: 128 },
    { time: "00:40", former: 120, current: 139 },
    { time: "00:50", former: 129, current: 257 },
    { time: "01:00", former: 186, current: 295 },
    { time: "01:10", former: 149, current: 366 },
    { time: "01:20", former: 142, current: 116 },
    { time: "01:30", former: 165, current: 383 },
    { time: "01:40", former: 93, current: 366 },
    { time: "01:50", former: 99, current: 335 }
]
} as const;

type DatasetKey = keyof typeof datasets;

const chartConfig = {
  former: {
    label: "이전 기록",
    color: "hsl(var(--chart-3))",
  },
  current: {
    label: "현재 기록",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function StudyRoomChart() {
  const [selectedDataset, setSelectedDataset] = React.useState<DatasetKey>("HrvData");

  // 선택한 데이터셋 가져오기
  const filteredData = [...datasets[selectedDataset]]; // readonly 배열을 일반 배열로 변환

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>집중력 차트</CardTitle>
          <CardDescription>선택한 데이터셋의 집중력을 보여주는 차트입니다</CardDescription>
        </div>
        <div className="flex space-x-4">
          <Select
            value={selectedDataset}
            onValueChange={(value) =>
              setSelectedDataset(value as "HrvData" | "EegData" | "FocusData")
            }
          >
            <SelectTrigger
              className="w-[160px] rounded-lg"
              aria-label="Select dataset"
            >
              <SelectValue placeholder="Select Dataset" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="HrvData" className="rounded-lg text-white">
                HRV Data
              </SelectItem>
              <SelectItem value="EegData" className="rounded-lg text-white">
                EEG Data
              </SelectItem>
              <SelectItem value="FocusData" className="rounded-lg text-white">
                Focus Data
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
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
      </CardContent>
    </Card>
  );
}
