import { useCallback, useMemo } from "react"
import { DashboardLayout } from "@/components/dashboardComponents/DashboardLayout"
import PayrollGenerateForm from "@/components/payrollComponents/PayrollGenerateForm"
import PayrollTable from "@/components/payrollComponents/PayrollTable"
import { useAuthStore } from "@/store/useAuthStore"
import { usePayrollStore } from "@/store/usePayrollStore"

const PayrollPage = () => {
  const user = useAuthStore((state) => state.user)
  const { isGenerateModalOpen, onOpenGenerate } = usePayrollStore()

  const payrollConfig = useMemo(
    () => ({
      appName: "EmpTrack",
      portalName: "Admin Portal",
      variant: "admin",
      user: {
        name: user?.name || "Admin",
        role: "System Administrator",
        id: user?.id || "",
      },
    }),
    [user],
  )

  const generatePayroll = useCallback(() => {
    onOpenGenerate()
  }, [onOpenGenerate])

  return (
    <DashboardLayout
      config={payrollConfig}
      actionButton={{
        label: "Generate Payroll",
        onClick: generatePayroll,
      }}
      minimalLayout
    >
      <div className="w-full max-w-full overflow-hidden">
        <div className="space-y-4 sm:space-y-6 px-3 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8 md:pb-10">
          <div className="flex flex-col space-y-2 sm:hidden">
            <h1 className="text-lg font-semibold text-slate-900">Payroll Management</h1>
            <p className="text-sm text-slate-600">Generate and manage employee payrolls</p>
          </div>

          <div className="w-full">
            <PayrollTable />
          </div>
        </div>
      </div>

      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <PayrollGenerateForm />
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default PayrollPage