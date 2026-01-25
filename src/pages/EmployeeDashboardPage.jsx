// EmployeeDashboardPage.tsx
import { DashboardLayout } from '@/components/dashboardComponents/DashboardLayout'
import { EMPLOYEE_FEATURES } from '@/config/employeeFeatures'
import { useAuthStore } from '@/store/useAuthStore'
import { Calendar, Clock, TrendingUp, UserCheck } from 'lucide-react'
import React from 'react'

const EmployeeDashboardPage = () => {
  const { user, userType, role } = useAuthStore.getState()

  if (!user || !userType) {
    return <div>User not login</div>
  }

  const employeeFeatures = Object.values(EMPLOYEE_FEATURES)

  const employeeConfig = {
    appName: "EmpTrack",
    portalName: "Employee Portal",
    variant: "employee",
    user: {
      name: `${user.name}`,
      role: "Employee",
      id: `${user.id}`,
    },
    features: employeeFeatures,
    stats: [
      { title: "Total Working Days", value: "22", icon: Calendar, color: "from-purple-600 to-purple-700" },
      { title: "Days Attended", value: "19", icon: UserCheck, color: "from-indigo-600 to-indigo-700" },
      { title: "Performance", value: "88.5%", icon: TrendingUp, color: "from-blue-600 to-blue-700" },
      { title: "Leaves Taken", value: "2", icon: Clock, color: "from-emerald-600 to-emerald-700" },
    ],
  }

  if (user && userType !== 'employee' && !["HR", "SR_MANAGER", "MANAGER", "ACCOUNTANT", "EMPLOYEE"].includes(role)) {
    return <div>User is not an employee</div>
  }

  return (
    <DashboardLayout config={employeeConfig}>
      {/* Clock-in/out buttons are now in the topbar */}
      {/* You can add other employee-specific content here */}
    </DashboardLayout>
  )
}

export default EmployeeDashboardPage