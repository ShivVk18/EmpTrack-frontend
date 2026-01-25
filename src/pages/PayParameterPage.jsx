import { DashboardLayout } from "@/components/dashboardComponents/DashboardLayout"
import PayParameterForm from "@/components/payParameterComponents/PayParameterForm"
import PayParameterTable from "@/components/payParameterComponents/PayParameterTable"
import { useAuthStore } from "@/store/useAuthStore"
import { usePayParameterStore } from "@/store/usePayParameterStore"
import { useCallback, useMemo } from "react"

const PayParameterPage = () => {
  const user = useAuthStore((state) => state.user)
  const { isModalOpen, onOpen } = usePayParameterStore()

  const payParameterConfig = useMemo(
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

  const addPayParameter = useCallback(() => {
    onOpen(null)
  }, [onOpen])

  return (
    <DashboardLayout
      config={payParameterConfig}
      actionButton={{
        label: "Add PayParameter",
        onClick: addPayParameter,
      }}
      minimalLayout
    >
      <div className="w-full max-w-full overflow-hidden">
        <div className="space-y-4 sm:space-y-6 px-3 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8 md:pb-10">
          <div className="flex flex-col space-y-2 sm:hidden">
            <h1 className="text-lg font-semibold text-slate-900">Pay Parameter Management</h1>
            <p className="text-sm text-slate-600">Manage payroll parameters</p>
          </div>

          <div className="w-full">
            <PayParameterTable />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <PayParameterForm />
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default PayParameterPage
