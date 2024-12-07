import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { quarter: "T1", value: 180 },
  { quarter: "T2", value: 220 },
  { quarter: "T3", value: 240 },
  { quarter: "T4", value: 160 },
];

const CustomBar = (props) => {
  const { x, y, width, height } = props;
  return (
    <g>
      <defs>
        <linearGradient
          id={`gradient-${props.index}`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor="#86919F" />
          <stop offset="100%" stopColor="#1C2A3B" />
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#gradient-${props.index})`}
        rx={8}
        ry={8}
      />
    </g>
  );
};

const GradientBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 45, left: 0, bottom: 5 }}
        barCategoryGap={20}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" axisLine={false} tickLine={false} />
        <YAxis
          dataKey="quarter"
          type="category"
          axisLine={false}
          tickLine={false}
        />
        <Bar dataKey="value" shape={<CustomBar />} barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GradientBarChart;
