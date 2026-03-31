import { DashboardLayout } from "@/components/dashboardComponents/DashboardLayout";
import MyPayrollTable from "@/components/payrollComponents/MyPayrollTable";

import { useAuthStore } from "@/store/useAuthStore";

import React, {  useMemo } from "react";

const EmployeeSalary = () => {
 
  const { user, userType, role } = useAuthStore.getState();

  if (!user || !userType)
    return <div className="p-4">User not logged in</div>;




  const holidayConfig = useMemo(
    () => ({
      appName: "EmpTrack",
      portalName:  "Employee Portal",
      variant:  "employee", 
      user: {
        name:
          user?.name ||
          (userType === "employee" ? "Employee" : "Admin"),
        role: user?.role || "Unknown Role",
        id: user?.id || "",
      },
    }),
    [user, userType, role]
  );

  return (
    <DashboardLayout
      config={holidayConfig} 
      searchPlaceholder="Search Salary"
      minimalLayout
    >
      <div className="w-full max-w-full overflow-hidden">
        <div className="space-y-4 sm:space-y-6 px-3 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8 md:pb-10">
         
          <div className="flex flex-col space-y-2 sm:hidden">
            <h1 className="text-lg font-semibold text-slate-900">
              View Salary
            </h1>
           
          </div>

          {/* Shared holiday table */}
          <div className="w-full">
            {/* SalaryTable */}
            <MyPayrollTable/>
          </div>
        </div>
      </div>

      {/* Modal for admins */}
      
    </DashboardLayout>
  );
};

export default EmployeeSalary;
