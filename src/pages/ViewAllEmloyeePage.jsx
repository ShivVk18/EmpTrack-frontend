import React, { useMemo } from "react"
import { DashboardLayout } from "@/components/dashboardComponents/DashboardLayout"
import { useAuthStore } from "@/store/useAuthStore"
import { EMPLOYEE_FEATURES } from "@/config/employeeFeatures"
import EmployeeTable from "@/components/employeeComponent/EmployeeTable"

import { useNavigate } from "react-router"

const EmployeeStatsOverview = React.lazy(() => import("@/components/employeeStatsComponents/EmployeeStatsOverview"))

const ViewAllEmployeePage = () => {
  const user = useAuthStore((state) => state.user)
  
  const navigate = useNavigate()
  const handleAddEmployee = () => {
    navigate("/admin/dashboard/employee-management/add")
  }


  const employeeConfig = useMemo(
    () => ({
      appName: "EmpTrack",
      portalName: "Admin Portal",
      variant: "admin",
      user: {
        name: user.name,
        role: "System Administrator",
        id: user.id,
      },
      features: Object.values(EMPLOYEE_FEATURES),
    }),
    [user],
  )

  return (
    <DashboardLayout
      config={employeeConfig}
      searchPlaceholder="Search employee"
      actionButton={{
        label: "Add Employee",
        onClick: handleAddEmployee,
      }}
      minimalLayout
    >
      <EmployeeTable />

      
    </DashboardLayout>
  )
}

export default ViewAllEmployeePage
