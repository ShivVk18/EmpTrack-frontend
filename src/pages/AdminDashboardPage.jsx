import { DashboardLayout } from '@/components/dashboardComponents/DashboardLayout'
import { FEATURES } from '@/config/features'
import { useAuthStore } from '@/store/useAuthStore'
import { BarChart2, Clock, Home, Settings, Shield, TrendingUp, UserCheck, Users } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router'

const AdminDashboardPage = () => {

  const user = useAuthStore((state)=>state.user)
  const userType = useAuthStore((state)=>state.userType)
  const navigate = useNavigate()
  console.log(user)  

  const adminFeatures = Object.values(FEATURES);
   
 if (!user || !userType) {
    return <div>User not login</div>;
  }

  if (user && userType !== "admin") {
    return <div>User is not an admin</div>;
  }

   const adminConfig  = {
    appName: "EmpTrack",
    portalName: "Admin Portal",
    variant: "admin",
    user: {
      name: `${user.name}`,
      role: "System Administrator",
      id: `${user.id}`
    },
    features: adminFeatures,
    stats: [
      { title: "Total Employees", value: "2,847", icon: Users, color: "from-purple-600 to-purple-700" },
      { title: "Active Today", value: "1,923", icon: UserCheck, color: "from-indigo-600 to-indigo-700" },
      { title: "Performance", value: "94.2%", icon: TrendingUp, color: "from-blue-600 to-blue-700" },
      { title: "Pending Tasks", value: "47", icon: Clock, color: "from-emerald-600 to-emerald-700" }
    ],
    statusInfo: {
      label: "System Status",
      value: "Online",
      status: "online"
    },
    activeUsersInfo: {
      label: "Active Users",
      value: "1,923"
    }
  };
    
  return (

    <div>
    

    <DashboardLayout  
     config={adminConfig}
      searchPlaceholder="Search employees, reports..."
      actionButton={{
        label: "Add Employee",
        onClick: () => (navigate('/admin/dashboard/employeeManagement'))
      }}
      timeInfo={{
        time: "09:23 AM",
        location: "Admin Center"
      }}
      unreadCount={2}
      onFeatureSelect={(title) => {
        console.log(`Selected feature: ${title}`);
        
      }}
    
    
    />
     </div>
  )
} 




export default AdminDashboardPage