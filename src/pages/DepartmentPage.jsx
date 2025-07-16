import { DashboardLayout } from "@/components/dashboardComponents/DashboardLayout";

import DepartmentDetailPage from "@/components/departmentDesignationComponents/DepartmentDetailPage";

import { useAuthStore } from "@/store/useAuthStore";
import React, { useMemo } from "react";

const DepartmentPage = () => {
  const user = useAuthStore((state) => state.user);

  const departmentDesignationConfig = useMemo(
    () => ({
      appName: "EmpTrack",
      portalName: "Employee Management",
      variant: "admin",
      user: {
        name: user.name,
        role: "System Administrator",
        id: user.id,
      },
      
    }),
    [user]
  );
  return (
    <DashboardLayout
      config={departmentDesignationConfig}
      searchPlaceholder="Search Department"
      minimalLayout
    >
      <DepartmentDetailPage />
    </DashboardLayout>
  );
};

export default DepartmentPage;
