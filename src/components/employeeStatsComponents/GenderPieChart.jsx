import { PIE_COLORS } from "@/utils/colorsUtils";
import { Users } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



const GenderPieChart = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item.gender,
    value: item.count,
  }));
  
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="700"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4 lg:mb-6">
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-2 lg:p-3 rounded-lg shadow-md mr-3">
          <Users className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
        </div>
        <div>
          <h3 className="text-base lg:text-lg font-bold text-gray-900">Gender Distribution</h3>
          <p className="text-xs lg:text-sm text-gray-600">Employee gender breakdown</p>
        </div>
      </div>
      <div className="h-48 sm:h-56 lg:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={window.innerWidth < 640 ? 50 : window.innerWidth < 1024 ? 60 : 70}
              fill="#8884d8"
              dataKey="value"
              stroke="#ffffff"
              strokeWidth={3}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '13px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {chartData.map((entry, index) => (
          <div key={entry.name} className="flex items-center text-sm font-medium">
            <div 
              className="w-3 h-3 rounded-full mr-2 flex-shrink-0 shadow-sm"
              style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
            />
            <span className="text-gray-700">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenderPieChart
