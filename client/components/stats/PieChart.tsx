"use client";
import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Chart({
  data,
}: {
  data: { id: number; value: number; label: string; color: string }[];
}) {
  return (
    <PieChart
      series={[
        {
          data: data.map((item) => ({
            id: item.id,
            value: item.value,
            label: item.label,
            color: item.color,
          })),
        },
      ]}
      width={400}
      height={200}
    />
  );
}