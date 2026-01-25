import { DashboardLayout } from '@/components/dashboardComponents/DashboardLayout';
import LeavePolicyField from '@/components/leaveComponents/LeavePolicyField';
import LeavePolicyForm from '@/components/leaveComponents/LeavePolicyForm';
import { useAuthStore } from '@/store/useAuthStore';
import { useleavePolicy } from '@/store/useLeavePolicy';
import React, { useCallback, useMemo } from 'react'

function LeavePolicyPage() {

    const user = useAuthStore((state) => state.user);
    
    const {onOpen,isModalOpen}  = useleavePolicy()
    
   
    
      const leavePolicyConfig = useMemo(
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
        [user]
      ); 


      const addLeavePolicy = useCallback(()=> {onOpen()},[onOpen])
          
  return (
    <DashboardLayout
    config={leavePolicyConfig}
    actionButton={{
        label: "Add LeavePolicy",
        onClick: addLeavePolicy,
      }}
    minimalLayout
     >
          <div className="w-full max-w-full overflow-hidden">
        <div className="space-y-4 sm:space-y-6 px-3 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8 md:pb-10">
          {/* Page Header - Mobile Optimized */}
          <div className="flex flex-col space-y-2 sm:hidden">
            <h1 className="text-lg font-semibold text-slate-900">
              Leave Policy Managment
            </h1>
            <p className="text-sm text-slate-600">
              Manage leave policy 
            </p>
          </div>

          {/* Holiday Table Container */}
          <div className="w-full">
            <LeavePolicyField />
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
                    Add Leave Policy
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Create a new leave policy
                  </p>
                </div>
              </div>

              
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <LeavePolicyForm />
              </div>
            </div>
          </div>
        </div>  
)}
    </DashboardLayout>
  )
}

export default LeavePolicyPage