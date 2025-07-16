import { PIE_COLORS } from "@/utils/colorsUtils";
import { UserCog } from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";



const RolePieChart = ({ data }) => {
    const chartData = data.map((item) => ({
    name: item.role,
    value: item.count,
  }));

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4 lg:mb-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 lg:p-3 rounded-lg shadow-md mr-3">
          <UserCog className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
        </div>
        <div>
          <h3 className="text-base lg:text-lg font-bold text-gray-900">Employees by Role</h3>
          <p className="text-xs lg:text-sm text-gray-600">Role distribution overview</p>
        </div>
      </div>
      <div className="h-48 sm:h-56 lg:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={window.innerWidth < 640 ? 45 : window.innerWidth < 1024 ? 55 : 65}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => percent > 5 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
              labelLine={false}
              stroke="#ffffff"
              strokeWidth={2}
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
    </div>
  );
};

export default RolePieChart;
