import { useState, useEffect } from "react"
import {
  Edit3,
  Eye,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  Building2,
  DollarSign,
  UserCheck,
} from "lucide-react"
import { usePayrollStore } from "@/store/usePayrollStore"
import { useAuthStore } from "@/store/useAuthStore"
import { useDepartments } from "@/hooks/useDepartments"
import PayrollUpdateForm from "./PayrollUpdateForm"

const PayrollTable = () => {
  const { payrolls, isLoading, pagination, filters, fetchPayrolls, setFilters, onOpenUpdate, isUpdateModalOpen } =
    usePayrollStore()

  const user = useAuthStore((state) => state.user)
  const { departments, fetchDepartments} = useDepartments()

  const [localFilters, setLocalFilters] = useState({
    month: "",
    year: "",
    employeeType: "",
    departmentId: "",
    search: "",
  })

  useEffect(() => {
    fetchPayrolls()
    fetchDepartments
  }, [filters])

  const handleFilterChange = (field, value) => {
    setLocalFilters((prev) => ({ ...prev, [field]: value }))
  }

  const applyFilters = () => {
    const cleanFilters = Object.fromEntries(Object.entries(localFilters).filter(([_, value]) => value !== ""))
    setFilters(cleanFilters)
  }

  const clearFilters = () => {
    setLocalFilters({
      month: "",
      year: "",
      employeeType: "",
      departmentId: "",
      search: "",
    })
    setFilters({})
  }

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  const getMonthName = (month) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months[month - 1]
  }

  const getEmployeeTypeColor = (type) => {
    const colors = {
      PERMANENT: "bg-green-100 text-green-800",
      CONTRACT: "bg-blue-100 text-blue-800",
      TEMPORARY: "bg-yellow-100 text-yellow-800",
      INTERN: "bg-purple-100 text-purple-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Filters Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            Payroll Records
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              <Calendar className="inline h-3 w-3 mr-1" />
              Month
            </label>
            <select
              value={localFilters.month}
              onChange={(e) => handleFilterChange("month", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Months</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {getMonthName(i + 1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
            <input
              type="number"
              value={localFilters.year}
              onChange={(e) => handleFilterChange("year", e.target.value)}
              placeholder="Year"
              min="2020"
              max="2030"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              <UserCheck className="inline h-3 w-3 mr-1" />
              Employee Type
            </label>
            <select
              value={localFilters.employeeType}
              onChange={(e) => handleFilterChange("employeeType", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="PERMANENT">Permanent</option>
              <option value="CONTRACT">Contract</option>
              <option value="TEMPORARY">Temporary</option>
              <option value="INTERN">Intern</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              <Building2 className="inline h-3 w-3 mr-1" />
              Department
            </label>
            <select
              value={localFilters.departmentId}
              onChange={(e) => handleFilterChange("departmentId", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Departments</option>
              {departments &&
                departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              <Search className="inline h-3 w-3 mr-1" />
              Search
            </label>
            <input
              type="text"
              value={localFilters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              placeholder="Search employee..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 mt-4">
          <button
            type="button"
            onClick={applyFilters}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Filter className="h-4 w-4 mr-2 inline" />
            Apply Filters
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading payrolls...</span>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Basic Salary
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross Salary
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deductions
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Salary
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrolls && payrolls.length > 0 ? (
                payrolls.map((payroll) => (
                  <tr key={payroll.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{payroll.employee?.name}</div>
                        <div className="text-sm text-gray-500">{payroll.employee?.employeeCode}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getMonthName(payroll.month)} {payroll.year}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEmployeeTypeColor(payroll.employee?.type)}`}
                      >
                        {payroll.employee?.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {formatCurrency(payroll.basicSalary)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                      {formatCurrency(payroll.grossSalary)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600 text-right">
                      {formatCurrency(payroll.totalDeductions)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 text-right font-semibold">
                      {formatCurrency(payroll.netSalary)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => onOpenUpdate(payroll)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          title="Edit Payroll"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => console.log("View details:", payroll.id)}
                          className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <DollarSign className="h-12 w-12 text-gray-300" />
                      <div className="text-gray-500">
                        <p className="text-base font-medium">No payroll records found</p>
                        <p className="text-sm">Generate payroll to see records here</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <span>
              Showing {(pagination.currentPage - 1) * 10 + 1} to{" "}
              {Math.min(pagination.currentPage * 10, pagination.totalCount)} of {pagination.totalCount} results
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrev}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let page
                if (pagination.totalPages <= 5) {
                  page = i + 1
                } else if (pagination.currentPage <= 3) {
                  page = i + 1
                } else if (pagination.currentPage >= pagination.totalPages - 2) {
                  page = pagination.totalPages - 4 + i
                } else {
                  page = pagination.currentPage - 2 + i
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      page === pagination.currentPage ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNext}
              className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Summary Section */}
      {payrolls && payrolls.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Total Employees</p>
                  <p className="text-lg font-semibold text-blue-600">{payrolls.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Total Gross</p>
                  <p className="text-lg font-semibold text-green-600">
                    {formatCurrency(payrolls.reduce((sum, p) => sum + Number(p.grossSalary), 0))}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Total Net</p>
                  <p className="text-lg font-semibold text-emerald-600">
                    {formatCurrency(payrolls.reduce((sum, p) => sum + Number(p.netSalary), 0))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <PayrollUpdateForm />
          </div>
        </div>
      )}
    </div>
  )
}

export default PayrollTable
