import { UserCheck } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const TypeBarChart = ({ data }) => {
  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4 lg:mb-6">
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-2 lg:p-3 rounded-lg shadow-md mr-3">
          <UserCheck className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
        </div>
        <div>
          <h3 className="text-base lg:text-lg font-bold text-gray-900">Employees by Type</h3>
          <p className="text-xs lg:text-sm text-gray-600">Employment type breakdown</p>
        </div>
      </div>
      <div className="h-64 sm:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="type" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '13px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
            />
            <Bar 
              dataKey="count" 
              fill="url(#tealGradient)" 
              radius={[6, 6, 0, 0]}
              stroke="#14B8A6"
              strokeWidth={1}
            />
            <defs>
              <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14B8A6" />
                <stop offset="100%" stopColor="#0D9488" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TypeBarChart;