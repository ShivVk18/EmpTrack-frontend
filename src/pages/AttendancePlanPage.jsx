import { DashboardLayout } from "@/components/dashboardComponents/DashboardLayout"
import AttendancePlanForm from "@/components/attendancePlanComponents/AttendancePlanForm"
import AttendancePlanTable from "@/components/attendancePlanComponents/AttendancePlanTable"
import { useAuthStore } from "@/store/useAuthStore"
import { useAttendancePlanStore } from "@/store/useAttendancePlanStore"
import { useCallback, useMemo } from "react"

const AttendancePlanPage = () => {
  const user = useAuthStore((state) => state.user)
  const { isModalOpen, onOpen } = useAttendancePlanStore()

  const attendancePlanConfig = useMemo(
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

  const addAttendancePlan = useCallback(() => {
    onOpen(null)
  }, [onOpen])

  return (
    <DashboardLayout
      config={attendancePlanConfig}
      actionButton={{
        label: "Add Attendance Plan",
        onClick: addAttendancePlan,
      }}
      minimalLayout
    >
      <div className="w-full max-w-full overflow-hidden">
        <div className="space-y-4 sm:space-y-6 px-3 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8 md:pb-10">
          <div className="flex flex-col space-y-2 sm:hidden">
            <h1 className="text-lg font-semibold text-slate-900">Attendance Plan Management</h1>
            <p className="text-sm text-slate-600">Manage attendance plans and policies</p>
          </div>
          <div className="w-full">
            <AttendancePlanTable />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <AttendancePlanForm />
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default AttendancePlanPage