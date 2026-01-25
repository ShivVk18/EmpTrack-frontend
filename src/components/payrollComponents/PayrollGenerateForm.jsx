import { useState, useEffect } from "react"
import { X, DollarSign, Calendar, Users, Building2 } from "lucide-react"
import { usePayrollStore } from "@/store/usePayrollStore"
import { useDepartments } from "@/hooks/useDepartments"
import { toast } from "sonner"

const PayrollGenerateForm = () => {
  const { onCloseGenerate, generatePayroll, isLoading } = usePayrollStore()
  const { departments, fetchDepartments } = useDepartments()

  const [formData, setFormData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    employeeType: "",
    departmentIds: [],
    employeeIds: [],
  })

  useEffect(() => {
    fetchDepartments()
  }, [])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDepartmentToggle = (deptId) => {
    setFormData((prev) => ({
      ...prev,
      departmentIds: prev.departmentIds.includes(deptId)
        ? prev.departmentIds.filter((id) => id !== deptId)
        : [...prev.departmentIds, deptId],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.month || !formData.year) {
      toast.error("Please select month and year")
      return
    }

    console.log("[v0] Form data before submission:", formData)
    console.log("[v0] Auth token:", localStorage.getItem("token") ? "Present" : "Missing")

    try {
      const payload = {
        month: Number(formData.month),
        year: Number(formData.year),
        ...(formData.employeeType && { employeeType: formData.employeeType }),
        ...(formData.departmentIds.length > 0 && { departmentIds: formData.departmentIds }),
      }

      console.log("[v0] Payload being sent to API:", payload)
      console.log("[v0] Payload types:", {
        month: typeof payload.month,
        year: typeof payload.year,
        employeeType: typeof payload.employeeType,
        departmentIds: Array.isArray(payload.departmentIds),
      })

      await generatePayroll(payload)
      console.log("[v0] Payroll generation successful")
    } catch (error) {
      console.error("[v0] Error in form submission:", error)
      console.error("[v0] Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <DollarSign className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Generate Payroll</h3>
            <p className="text-sm text-gray-600">Create salary records for employees</p>
          </div>
        </div>
        <button onClick={onCloseGenerate} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-80px)]">
        <div className="p-6 space-y-6">
          {/* Period Selection */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-3 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Payroll Period
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Month *</label>
                <select
                  value={formData.month}
                  onChange={(e) => handleInputChange("month", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {getMonthName(i + 1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="2020"
                  max="2030"
                  required
                />
              </div>
            </div>
          </div>

          {/* Employee Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Employee Type (Optional)
            </label>
            <select
              value={formData.employeeType}
              onChange={(e) => handleInputChange("employeeType", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="PERMANENT">Permanent</option>
              <option value="CONTRACT">Contract</option>
              <option value="TEMPORARY">Temporary</option>
              <option value="INTERN">Intern</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Leave empty to generate for all employee types</p>
          </div>

          {/* Department Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              Departments (Optional)
            </label>
            <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto">
              {departments && departments.length > 0 ? (
                <div className="space-y-2">
                  {departments.map((dept) => (
                    <label
                      key={dept.id}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={formData.departmentIds.includes(dept.id)}
                        onChange={() => handleDepartmentToggle(dept.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{dept.name}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No departments available</p>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Leave empty to generate for all departments</p>
          </div>

          {/* Info Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This will generate salary records for all eligible employees matching the selected
              criteria. Existing records for the same period will not be duplicated.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onCloseGenerate}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Generating..." : "Generate Payroll"}
          </button>
        </div>
      </form>
    </div>
  )
}

const getMonthName = (month) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  return months[month - 1]
}

export default PayrollGenerateForm