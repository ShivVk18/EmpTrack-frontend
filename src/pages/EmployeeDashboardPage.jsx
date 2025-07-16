import { DashboardLayout } from '@/components/dashboardComponents/DashboardLayout'
import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'

const EmployeeDashboardPage = () => {

  const {user,userType,role} = useAuthStore.getState()  
  
     
    if(!user || !userType){
      return (
        <div>
          User not login
        </div>
      )
    }
  
    if(user && userType!=='employee' && !["HR","SR_MANAGER","MANAGER","ACCOUNTANT","EMPLOYEE"].includes(role)){
      return (
        <div>
          User is not an employee
        </div>
      )
    }
  return (
    <div>

      <h1>
        WELCOME TO EMPLOYEE DASHBOARD
      </h1>  

      <DashboardLayout /> 
    </div>
  )
}

export default EmployeeDashboardPage