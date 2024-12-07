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
  { name: "T1", value: 800, fill: "url(#criticalGradient)" },
  { name: "T2", value: 750, fill: "url(#mediumGradient)" },
  { name: "T3", value: 650, fill: "url(#normalGradient)" },
];

const PriorityBarChart = () => {
  return (
    <div className="w-full height-full">
      <div className="flex justify-between mb-4 text-gray-400 text-sm" style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
        <div className="flex items-center">
          {/* <div className="w-4 h-4 rounded bg-red-500 mr-2"></div> */}
          <span style={{ display:'flex' , gap:'4px' , alignItems:'center' }}> <div style={{ width: '10px', height: '10px', borderRadius: '5px', backgroundColor: '#279B9B' }}></div> <div>T1: Critical</div></span>
        </div>
        <div className="flex items-center">
          {/* <div className="w-4 h-4 rounded bg-yellow-400 mr-2"></div> */}
          <span style={{ display:'flex' , gap:'4px' , alignItems:'center'}}> <div style={{ width: '10px', height: '10px', borderRadius: '5px', backgroundColor: '#2F8DB5' }}></div> T2: Medium</span>
        </div>
        <div className="flex items-center">
          {/* <div className="w-4 h-4 rounded bg-green-500 mr-2"></div> */}
          <span style={{ display:'flex' , gap:'4px' , alignItems:'center'}}><div style={{ width: '10px', height: '10px', borderRadius: '5px', backgroundColor: '#1B61B1' }}></div> T3: Normal</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 45, left: 0, bottom: 0 }}
          barGap={20} // Add this line to increase gap between bars
        >
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF" }}
            domain={[0, "dataMax"]}
            ticks={[0, 50, 100, 150]}
          />
          <YAxis
            dataKey="name"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9CA3AF" }}
            width={30}
          />
          <CartesianGrid stroke="#E5E7EB" horizontal={false} />
          <Bar dataKey="value" barSize={30} radius={[0, 8, 8, 0]} /> {/* Reduced barSize from 40 to 30 */}
          <defs>
            <linearGradient id="criticalGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#80DBDB" />
              <stop offset="100%" stopColor="#279B9B" />
            </linearGradient>
            <linearGradient id="mediumGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A9D4E7" />
              <stop offset="100%" stopColor="#2F8DB5" />
            </linearGradient>
            <linearGradient id="normalGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8AB2DE" />
              <stop offset="100%" stopColor="#1B61B1" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriorityBarChart;


// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { quarter: "T1", value: 180, label: "Critical" },
//   { quarter: "T2", value: 220, label: "Medium" },
//   { quarter: "T3", value: 240, label: "Normal" },
//   { quarter: "T4", value: 160, label: "" },
// ];

// const CustomBar = (props) => {
//   const { x, y, width, height, index } = props;
//   return (
//     <g>
//       <defs>
//         <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="0">
//           <stop offset="0%" stopColor="#2CC295" />
//           <stop offset="100%" stopColor="#89E8CC" />
//         </linearGradient>
//       </defs>
//       <rect x={x} y={y} width={width} height={height} fill={`url(#gradient-${index})`} />
//     </g>
//   );
// };

// const CustomLegend = () => {
//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
//       <div>T1: Critical</div>
//       <div>T2: Medium</div>
//       <div>T3: Normal</div>
//     </div>
//   );
// };

// const PriorityBarChart = () => {
//   return (
//     <div>
//       <CustomLegend />
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="quarter" />
//           <YAxis />
//           <Bar dataKey="value" shape={<CustomBar />} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default PriorityBarChart;
