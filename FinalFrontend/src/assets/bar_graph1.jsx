
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
  { quarter: "S1", value: 180 },
  { quarter: "S2", value: 220 },
  { quarter: "S3", value: 240 },
  { quarter: "S4", value: 160 },
];

const CustomBar1 = (props) => {
  const { x, y, width, height } = props;
  return (
    <g>
      <defs>
        <linearGradient
          id={`gradient1-${props.index}`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor="#89E8CC" />
          <stop offset="100%" stopColor="#2CC295" />
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#gradient1-${props.index})`}
        rx={8}
        ry={8}
      />
    </g>
  );
};

const GreenGradientBarChart = () => {
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
        <Bar dataKey="value" shape={<CustomBar1 />} barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GreenGradientBarChart;
