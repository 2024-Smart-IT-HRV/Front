"use client";
import api from "../../api"; // 실제 JavaScript 파일을 가져옴
import React, { useEffect, useState } from "react";
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


// TypeScript 인터페이스 정의
interface HRVData {
  timestamp: string;
  hrv_data: number;
  sdnn: number;
  rmssd: number;
}

interface StudyRoomChartProps {
  subjectId: number;
}

const chartConfig: ChartConfig = {
  former: {
    label: "이전 기록",
    color: "hsl(var(--chart-3))",
  },
  current: {
    label: "현재 기록",
    color: "hsl(var(--chart-2))",
  },
};

export const StudyRoomChart: React.FC<StudyRoomChartProps> = ({ subjectId }) => {
  const [data, setData] = React.useState<HRVData[]>([]);
  const [stopFetching, setStopFetching] = useState(false); // 데이터를 더 이상 요청하지 않도록 제어

  
  // 백엔드에서 다음 데이터를 가져오기
  const fetchNextData = async () => {
    if (!subjectId || isNaN(subjectId)) {
      console.error("유효하지 않은 subject_id:", subjectId);
      setStopFetching(true); // 요청 중단
      return;
    } // 요청 중단 조건

    try {
      const response = await api.get("/hrv/next", {
        params: { subject_id: subjectId }, 
      });

      if (response.status === 200 && response.data) {
        setData((prevData) => [...prevData, response.data]); // 새 데이터 추가
      } else {
        console.warn("더 이상 데이터가 없습니다. 요청 중단.");
        setStopFetching(true); // 요청 중단 플래그 설정
      }
    } catch (error) {
      console.error("HRV 데이터를 가져오는 중 오류 발생:", error);
      setStopFetching(true); // 에러 발생 시 요청 중단
    }
  };

  // 주기적으로 데이터 요청 (10초 간격)
  useEffect(() => {
    if (stopFetching) return; // 요청 중단 조건
    const interval = setInterval(fetchNextData, 1000); // 10초 간격
    return () => clearInterval(interval);
  }, [stopFetching]);

  return (
    <>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>HRV 차트</CardTitle>
          <CardDescription>
            실시간으로 HRV 데이터를 보여줍니다.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={data}>
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
              dataKey="timestamp"
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
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="hrv_data"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-current)"
              stackId="a"
            />
            <Area
              dataKey="sdnn"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-former)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </>
  );
};