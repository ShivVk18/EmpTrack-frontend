import { DashboardLayout } from "@/components/dashboardComponents/DashboardLayout";
import { useAuthStore } from "@/store/useAuthStore";
import OwnAttendanceTable from "@/components/attendanceComponents/OwnAttendanceTable";
import React from "react";

const OwnAttendancePage = () => {
  const { user, userType, role } = useAuthStore.getState();

  if (!user || !userType) return <div className="p-4">User not logged in</div>;

  const isAdminOrHR =
    userType === "admin" || ["HR", "MANAGER", "SR_MANAGER"].includes(role);

  const isEmployee =
    userType === "employee" ||
    ["EMPLOYEE", "ACCOUNTANT"].includes(role);

  if (!isAdminOrHR && !isEmployee) {
    return <div className="p-4">You are not authorized to view this page.</div>;
  }

  const attendanceConfig = () => ({
    appName: "EmpTrack",
    portalName: isAdminOrHR ? "Admin Portal" : "Employee Portal",
    variant: isAdminOrHR ? "admin" : "employee",
    user: {
      name: user.name,
      role: role,
      id: user.id,
    },
  });

  return (
    <div className="min-h-screen w-full">
      <DashboardLayout
        config={attendanceConfig()}
        minimalLayout
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
              <p className="text-gray-600 mt-1">
                View and track your attendance records
              </p>
            </div>
          </div>
          
          <OwnAttendanceTable />
        </div>
      </DashboardLayout>
    </div>
  );
};

export default OwnAttendancePage;