import React, { useCallback, useMemo, Suspense } from "react";
import { useNavigate } from "react-router";
import { DashboardLayout } from "@/components/dashboardComponents/DashboardLayout";
import { useAuthStore } from "@/store/useAuthStore";
import { EMPLOYEE_FEATURES } from "@/config/employeeFeatures";
import { useEmployeeStats } from "@/hooks/useEmployeeStats";
import { Skeleton } from "@/components/ui/skeleton";
 


const EmployeeStatsOverview = React.lazy(() =>
  import("@/components/employeeStatsComponents/EmployeeStatsOverview")
);

const EmployeeManagementPage = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const { stats, loading } = useEmployeeStats();

  const handleAddEmployee = useCallback(() => {
    navigate("/admin/dashboard/employee-management/add");
  }, [navigate]);

  const employeeConfig = useMemo(
    () => ({
      appName: "EmpTrack",
      portalName: "Employee Management",
      variant: "admin",
      user: {
        name: user.name,
        role: "System Administrator",
        id: user.id,
      },
      features: Object.values(EMPLOYEE_FEATURES),
    }),
    [user]
  );

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
      <div className="p-4">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Skeleton className="h-64 w-full rounded-md" />
              <Skeleton className="h-64 w-full rounded-md" />
              <Skeleton className="h-64 w-full rounded-md" />
            </div>
          }
        >
          {!loading && stats ? (
            <EmployeeStatsOverview stats={stats} />
          ) : (
            <div className="text-center py-10 text-gray-500">Loading stats...</div>
          )}
        </Suspense>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeManagementPage;
