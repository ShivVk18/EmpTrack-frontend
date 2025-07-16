import { DashboardLayout } from "@/components/dashboardComponents/DashboardLayout";
import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { EMPLOYEE_FEATURES } from "@/config/employeeFeatures";
import AddEmployeeForm from "@/components/employeeComponent/AddEmployeeForm";

const AddEmployeePage = () => {
  const user = useAuthStore((state) => state.user);

  const config = {
    appName: "EmpTrack",
    portalName: "Admin Portal",
    variant: "admin",
    user: {
      name: `${user.name}`,
      role: "System Administrator",
      id: `${user.id}`,
    },
    features: Object.values(EMPLOYEE_FEATURES),
  };

  return (
    <DashboardLayout config={config} minimalLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
          
          {/* Compact Header */}
          <div className="mb-6">
            <div className="text-center sm:text-left">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Employee Registration
              </h1>
              <p className="mt-1 text-sm text-gray-600 sm:text-base">
                Complete the form below to add a new employee
              </p>
            </div>
          </div>

          {/* Form Container */}
          <AddEmployeeForm />
         
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddEmployeePage;