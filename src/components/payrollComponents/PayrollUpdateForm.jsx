import { useState, useEffect } from "react"
import { X, DollarSign, User } from "lucide-react"
import { usePayrollStore } from "@/store/usePayrollStore"

const PayrollUpdateForm = () => {
  const { selectedPayroll, onCloseUpdate, updatePayroll, isLoading } = usePayrollStore()

  const [formData, setFormData] = useState({
    basicSalary: "",
    otherAll: "",
    otherDeductions: "",
    remarks: "",
  })

  useEffect(() => {
    if (selectedPayroll) {
      setFormData({
        basicSalary: selectedPayroll.basicSalary || "",
        otherAll: selectedPayroll.otherAll || 0,
        otherDeductions: selectedPayroll.otherDeductions || 0,
        remarks: selectedPayroll.remarks || "",
      })
    }
  }, [selectedPayroll])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Only send changed fields
      const payload = {}
      if (formData.basicSalary && formData.basicSalary !== selectedPayroll.basicSalary) {
        payload.basicSalary = Number(formData.basicSalary)
      }
      if (formData.otherAll !== selectedPayroll.otherAll) {
        payload.otherAll = Number(formData.otherAll)
      }
      if (formData.otherDeductions !== selectedPayroll.otherDeductions) {
        payload.otherDeductions = Number(formData.otherDeductions)
      }
      if (formData.remarks !== selectedPayroll.remarks) {
        payload.remarks = formData.remarks
      }

      await updatePayroll(selectedPayroll.id, payload)
    } catch (error) {
      // Error is already handled in the store
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount || 0)
  }

  const calculatePreview = () => {
    const basic = Number(formData.basicSalary) || Number(selectedPayroll?.basicSalary) || 0
    const otherAll = Number(formData.otherAll) || 0
    const otherDeductions = Number(formData.otherDeductions) || 0

    // Use existing components from selected payroll for calculation
    const da = Number(selectedPayroll?.da) || 0
    const ta = Number(selectedPayroll?.ta) || 0
    const hra = Number(selectedPayroll?.hra) || 0
    const spall = Number(selectedPayroll?.spall) || 0
    const medicalAll = Number(selectedPayroll?.medicalAll) || 0
    const epf = Number(selectedPayroll?.epf) || 0
    const esi = Number(selectedPayroll?.esi) || 0
    const tds = Number(selectedPayroll?.tds) || 0
    const professionalTax = Number(selectedPayroll?.professionalTax) || 0

    const grossSalary = basic + da + ta + hra + spall + medicalAll + otherAll
    const totalDeductions = epf + esi + tds + professionalTax + otherDeductions
    const netSalary = grossSalary - totalDeductions

    return { grossSalary, totalDeductions, netSalary }
  }

  const preview = calculatePreview()

  if (!selectedPayroll) return null

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Update Payroll</h3>
            <p className="text-sm text-gray-600">
              {selectedPayroll.employee?.name} - {selectedPayroll.month}/{selectedPayroll.year}
            </p>
          </div>
        </div>
        <button onClick={onCloseUpdate} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-80px)]">
        <div className="p-6 space-y-6">
          {/* Employee Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <User className="h-4 w-4 text-gray-600 mr-2" />
              <h4 className="text-sm font-medium text-gray-900">Employee Information</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium">{selectedPayroll.employee?.name}</span>
              </div>
              <div>
                <span className="text-gray-600">Code:</span>
                <span className="ml-2 font-medium">{selectedPayroll.employee?.employeeCode}</span>
              </div>
              <div>
                <span className="text-gray-600">Type:</span>
                <span className="ml-2 font-medium">{selectedPayroll.employee?.type}</span>
              </div>
              <div>
                <span className="text-gray-600">Department:</span>
                <span className="ml-2 font-medium">{selectedPayroll.employee?.department?.name}</span>
              </div>
            </div>
          </div>

          {/* Salary Components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Basic Salary</label>
              <input
                type="number"
                value={formData.basicSalary}
                onChange={(e) => handleInputChange("basicSalary", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter basic salary"
                min="0"
                step="0.01"
              />
              <p className="text-xs text-gray-500 mt-1">Current: {formatCurrency(selectedPayroll.basicSalary)}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Other Allowances</label>
              <input
                type="number"
                value={formData.otherAll}
                onChange={(e) => handleInputChange("otherAll", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter other allowances"
                min="0"
                step="0.01"
              />
              <p className="text-xs text-gray-500 mt-1">Current: {formatCurrency(selectedPayroll.otherAll)}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Other Deductions</label>
              <input
                type="number"
                value={formData.otherDeductions}
                onChange={(e) => handleInputChange("otherDeductions", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter other deductions"
                min="0"
                step="0.01"
              />
              <p className="text-xs text-gray-500 mt-1">Current: {formatCurrency(selectedPayroll.otherDeductions)}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
              <textarea
                value={formData.remarks}
                onChange={(e) => handleInputChange("remarks", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Enter remarks"
              />
            </div>
          </div>

          {/* Preview Calculation */}
          {(formData.basicSalary || formData.otherAll || formData.otherDeductions) && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-green-900 mb-3">Updated Preview</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-green-800">Gross Salary</p>
                  <p className="text-lg font-semibold text-green-600">{formatCurrency(preview.grossSalary)}</p>
                </div>
                <div className="text-center">
                  <p className="text-green-800">Total Deductions</p>
                  <p className="text-lg font-semibold text-red-600">{formatCurrency(preview.totalDeductions)}</p>
                </div>
                <div className="text-center">
                  <p className="text-green-800">Net Salary</p>
                  <p className="text-lg font-semibold text-green-600">{formatCurrency(preview.netSalary)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onCloseUpdate}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Updating..." : "Update Payroll"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PayrollUpdateForm
