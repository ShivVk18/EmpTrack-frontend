import AllLeaveApplicationTable from '@/components/applyLeaveComponents/AllLeaveApplicationTable';

import { DashboardLayout } from '@/components/dashboardComponents/DashboardLayout';

import { useAuthStore } from '@/store/useAuthStore';
import { useleaveApplication } from '@/store/useLeaveApplicationStore';

import React, { useCallback, useMemo } from 'react'

function ManageLeaveApplicationPage() {

    const user = useAuthStore((state) => state.user);
    
    const {onOpen} = useleaveApplication()
     
     
    
      const leavePolicyConfig = useMemo(
        () => ({
          appName: "EmpTrack",
          portalName: "Employee Portal",
          variant: "employee",
          user: {
            name: user?.name || "Employee",
            role: "System Administrator",
            id: user?.id || "",
          },
        }),
        [user]
      ); 


      const addApplyLeave = useCallback(()=> {onOpen()},[onOpen])
          
  return (
    <DashboardLayout
    config={leavePolicyConfig}
    actionButton={{
        label: "Apply Leave",
        onClick: addApplyLeave,
      }}
    minimalLayout
     >
          <div className="w-full max-w-full overflow-hidden">
        <div className="space-y-4 sm:space-y-6 px-3 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8 md:pb-10">
          {/* Page Header - Mobile Optimized */}
          <div className="flex flex-col space-y-2 sm:hidden">
            <h1 className="text-lg font-semibold text-slate-900">
              Leave Application Managment
            </h1>
            <p className="text-sm text-slate-600">
              Manage leave Applications 
            </p>
          </div>

          
          <div className="w-full">
            <AllLeaveApplicationTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageLeaveApplicationPage