
import LeaveApplicationField from '@/components/applyLeaveComponents/LeaveApplicationField';
import LeaveApplicationForm from '@/components/applyLeaveComponents/LeaveApplicationForm';
import { DashboardLayout } from '@/components/dashboardComponents/DashboardLayout';

import { useAuthStore } from '@/store/useAuthStore';
import { useleaveApplication } from '@/store/useLeaveApplicationStore';

import React, { useCallback, useMemo } from 'react'

function LeaveApplicationPage() {

    const user = useAuthStore((state) => state.user);
    
    const {onOpen,isModalOpen} = useleaveApplication()
     
     
    
      const leaveApplicationConfig = useMemo(
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
    config={leaveApplicationConfig}
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
              Apply leave
            </h1>
            <p className="text-sm text-slate-600">
              Manage leave Applicaiton 
            </p>
          </div>

          
          <div className="w-full">
            <LeaveApplicationField />
          </div>
        </div>
      </div>

         {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
             
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 bg-slate-50/50">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Apply for new Leave
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Create a new Leave Application
                  </p>
                </div>
              </div>

              
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <LeaveApplicationForm />
              </div>
            </div>
          </div>
        </div>  
)}
    </DashboardLayout>
  )
}

export default LeaveApplicationPage