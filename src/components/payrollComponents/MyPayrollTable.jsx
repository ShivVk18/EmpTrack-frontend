import { useEffect, useRef, useState } from "react"
import {
  Eye,
  DollarSign,
  Calendar,
  Download,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

import { usePayrollStore } from "@/store/usePayrollStore"
import { useAuthStore } from "@/store/useAuthStore"
import api from "@/utils/axiosInstance"
import { toast } from "sonner"
import { useReactToPrint } from "react-to-print"

const MyPayrollTable = () => {

  /* ================= STORE ================= */

  const {
    payrolls,
    filters,
    fetchPayrolls,
    setFilters,
  } = usePayrollStore()

  const user = useAuthStore((s) => s.user)

  /* ================= STATES ================= */

  const [open, setOpen] = useState(false)
  const [selectedPayroll, setSelectedPayroll] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  const printRef = useRef(null)

  /* ================= FETCH ================= */

  useEffect(() => {
    if (user?.id) {
      setFilters({
        employeeId: user.id,
        limit: 12,
      })
    }
  }, [user])

  useEffect(() => {
    fetchPayrolls()
  }, [filters])

  /* ================= FORMAT ================= */

  const formatCurrency = (amt) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amt || 0)

  const getMonthName = (m) =>
    ["Jan","Feb","Mar","Apr","May","Jun",
     "Jul","Aug","Sep","Oct","Nov","Dec"][m - 1]

  /* ================= PRINT ================= */

  const handleDownload = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Payslip-${selectedPayroll?.month}-${selectedPayroll?.year}`,
  })

  /* ================= VIEW ================= */

  const viewPayroll = async (id) => {
    try {
      setOpen(true)
      setLoadingDetails(true)

      const res = await api.get(`/payroll/salaries/${id}`)
      setSelectedPayroll(res.data.data)

    } catch {
      toast.error("Failed to fetch payroll")
      setOpen(false)
    } finally {
      setLoadingDetails(false)
    }
  }

  /* ================= UI ================= */

  return (
    <div className="bg-white/95 rounded-xl shadow-sm border border-amber-100">

      {/* HEADER */}
      <div className="p-4 border-b border-amber-100 flex items-center gap-2 bg-amber-50/60">
        <DollarSign className="text-amber-600"/>
        <h2 className="font-semibold text-lg text-amber-950">
          My Payroll
        </h2>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-amber-50 text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Period</th>
              <th className="px-4 py-3 text-right">Basic</th>
              <th className="px-4 py-3 text-right">Gross</th>
              <th className="px-4 py-3 text-right">Deduction</th>
              <th className="px-4 py-3 text-right">Net</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-amber-100">

            {payrolls?.map((p) => (
              <tr key={p.id} className="hover:bg-amber-50/60">

                <td className="px-4 py-4 flex items-center">
                  <Calendar size={16} className="mr-2 text-amber-600"/>
                  {getMonthName(p.month)} {p.year}
                </td>

                <td className="text-right">
                  {formatCurrency(p.basicSalary)}
                </td>

                <td className="text-right font-medium text-amber-900">
                  {formatCurrency(p.grossSalary)}
                </td>

                <td className="text-right text-red-600">
                  {formatCurrency(p.totalDeductions)}
                </td>

                <td className="text-right text-emerald-700 font-semibold">
                  {formatCurrency(p.netSalary)}
                </td>

                <td className="text-center">
                  <button
                    onClick={() => viewPayroll(p.id)}
                    className="p-2 hover:bg-amber-50 rounded-lg text-amber-700"
                  >
                    <Eye size={16}/>
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl
    w-full
    bg-white
    p-0
    rounded-2xl
    border
    border-slate-200
    shadow-2xl
    overflow-hidden">

          {loadingDetails ? (
            <div className="py-12 text-center">
              Loading Payslip...
            </div>
          ) : selectedPayroll && (

            <>
              {/* DOWNLOAD BUTTON */}
              <div className="flex justify-end mb-4 px-6 pt-4">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg shadow-sm"
                >
                  <Download size={16}/>
                  Download Payslip
                </button>
              </div>

              {/* ================= PRINT AREA ================= */}
<div className="max-h-[80vh] overflow-y-auto px-2">
              <div
                ref={printRef}
                className="bg-white text-black
      w-full
      max-w-3xl
      mx-auto
      p-8
      space-y-6

      print:w-[800px]
      print:max-w-none
      print:p-10
      print:shadow-none"
                
              >



{/* EMPLOYEE INFO */}
<div className="grid grid-cols-2 gap-y-4 text-sm">

  <Info label="Employee Name">
    {selectedPayroll.employee.name}
  </Info>

  <Info label="Employee Code">
    {selectedPayroll.employee.employeeCode}
  </Info>

  <Info label="Pay Period">
    {getMonthName(selectedPayroll.month)} {selectedPayroll.year}
  </Info>

  <Info label="Bank Account">
    {selectedPayroll.employee.accountNo}
  </Info>

</div>

{/* SALARY TABLE */}
<table className="w-full border border-amber-100 text-sm mt-4 rounded-lg overflow-hidden">

  <thead className="bg-amber-50">
    <tr>
      <th className="border p-2 text-left">Earnings</th>
      <th className="border p-2 text-right">Amount</th>
      <th className="border p-2 text-left">Deductions</th>
      <th className="border p-2 text-right">Amount</th>
    </tr>
  </thead>

  <tbody className="divide-y divide-amber-50">

    <PayslipRow
      e1="Basic Salary"
      v1={selectedPayroll.basicSalary}
      e2="TDS"
      v2={selectedPayroll.tds}
    />

    <PayslipRow
      e1="HRA"
      v1={selectedPayroll.hra}
      e2="Professional Tax"
      v2={selectedPayroll.professionalTax}
    />

    <PayslipRow
      e1="DA"
      v1={selectedPayroll.da}
      e2="EPF"
      v2={selectedPayroll.epf}
    />

    <PayslipRow
      e1="TA"
      v1={selectedPayroll.ta}
    />

    <PayslipRow
      e1="Medical Allowance"
      v1={selectedPayroll.medicalAll}
    />

  </tbody>

  <tfoot className="bg-amber-50 font-semibold">
    <tr>
      <td className="border p-2">
        Gross Salary
      </td>

      <td className="border p-2 text-right">
        {formatCurrency(selectedPayroll.grossSalary)}
      </td>

      <td className="border p-2">
        Total Deduction
      </td>

      <td className="border p-2 text-right">
        {formatCurrency(selectedPayroll.totalDeductions)}
      </td>
    </tr>
  </tfoot>

</table>

{/* NET SALARY */}
<div className="flex justify-between items-center border-t border-amber-100 pt-5">
  <span className="text-lg font-semibold">
    Net Salary Payable
  </span>

  <span className="text-2xl font-bold text-green-600">
    {formatCurrency(selectedPayroll.netSalary)}
  </span>
</div>

<p className="text-center text-xs text-gray-500 pt-6">
  This is a system generated payslip and does not require signature.
</p>
              </div>
              </div>
            </>
          )}

        </DialogContent>
      </Dialog>

    </div>
  )
}

/* ================= HELPERS ================= */

const Info = ({ label, children }) => (
  <div>
    <p className="text-gray-500 text-xs">{label}</p>
    <p className="font-semibold">{children}</p>
  </div>
)

const PayslipRow = ({ e1, v1, e2, v2 }) => (
  <tr>
    <td className="border p-2">{e1 || ""}</td>
    <td className="border p-2 text-right">
      {v1 ? `₹${v1}` : ""}
    </td>
    <td className="border p-2">{e2 || ""}</td>
    <td className="border p-2 text-right">
      {v2 ? `₹${v2}` : ""}
    </td>
  </tr>
)

export default MyPayrollTable