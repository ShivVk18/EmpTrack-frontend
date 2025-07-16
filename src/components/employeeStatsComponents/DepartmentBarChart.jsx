import { Building } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";  

const DepartmentBarChart = ({data}) => {
    return(
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-4 lg:mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 lg:p-3 rounded-lg shadow-md mr-3">
          <Building className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
        </div>
        <div>
          <h3 className="text-base lg:text-lg font-bold text-gray-900">Employees by Department</h3>
          <p className="text-xs lg:text-sm text-gray-600">Distribution across departments</p>
        </div>
      </div>
      <div className="h-64 sm:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="departmentName" 
              tick={{ fontSize: 11, fill: '#64748b' }}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
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
              fill="url(#blueGradient)" 
              radius={[6, 6, 0, 0]}
              stroke="#4F46E5"
              strokeWidth={1}
            />
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    )
}

export default DepartmentBarChart