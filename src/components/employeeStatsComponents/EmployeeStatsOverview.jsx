import GenderPieChart from "./GenderPieChart";
import DepartmentBarChart from "./DepartmentBarChart";
import RolePieChart from "./RolePieChart";
import TypeBarChart from "./TypeBarChart";

const EmployeeStatsOverview = ({ stats }) => {
  if (!stats) return null;
  
  const { overview, byDepartment, byGender, byRole, byType } = stats;
  
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Overview Card */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
        <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">📊 Employee Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-700">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-gray-600">Total Employees</div>
            <div className="text-lg sm:text-xl font-bold text-gray-900">{overview.total}</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-gray-600">Active</div>
            <div className="text-lg sm:text-xl font-bold text-green-600">{overview.active}</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-gray-600">Inactive</div>
            <div className="text-lg sm:text-xl font-bold text-red-600">{overview.inactive}</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-gray-600">Active %</div>
            <div className="text-lg sm:text-xl font-bold text-blue-600">{overview.activePercentage}%</div>
          </div>
          {overview.totalBudget && (
            <>
              <div className="bg-purple-50 p-3 rounded-lg col-span-2 sm:col-span-1">
                <div className="text-gray-600">Total Budget</div>
                <div className="text-sm sm:text-lg font-bold text-purple-600 truncate">₹{overview.totalBudget.toLocaleString()}</div>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg col-span-2 sm:col-span-1">
                <div className="text-gray-600">Avg Salary</div>
                <div className="text-sm sm:text-lg font-bold text-indigo-600 truncate">₹{overview.averageSalary.toLocaleString()}</div>
              </div>
              <div className="bg-teal-50 p-3 rounded-lg">
                <div className="text-gray-600">With Salary</div>
                <div className="text-lg sm:text-xl font-bold text-teal-600">{overview.employeesWithSalary}</div>
              </div>
            </>
          )}
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      
        <div className="lg:col-span-2">
          <DepartmentBarChart data={byDepartment} />
        </div>
        
        
        <div className="w-full">
          <GenderPieChart data={byGender} />
        </div>
        <div className="w-full">
          <RolePieChart data={byRole} />
        </div>
        
      
        <div className="lg:col-span-2">
          <TypeBarChart data={byType} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeStatsOverview;