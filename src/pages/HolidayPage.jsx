import { DashboardLayout } from "@/components/dashboardComponents/DashboardLayout";
import HolidayForm from "@/components/holidayComponents/HolidayForm";
import HolidayTable from "@/components/holidayComponents/HolidayTable";
import { useAuthStore } from "@/store/useAuthStore";
import { useHolidayStore } from "@/store/useHolidayStore";
import React, { useCallback, useMemo } from "react";

const HolidayPage = () => {
  const { isModalOpen, onOpen } = useHolidayStore();
  const { user, userType, role } = useAuthStore.getState();

  if (!user || !userType)
    return <div className="p-4">User not logged in</div>;

  const isAdminOrHR =
    userType === "admin" || ["HR", "MANAGER", "SR_MANAGER"].includes(role);

  const isEmployee =
    userType === "employee" || ["EMPLOYEE", "ACCOUNTANT"].includes(role);

  if (!isAdminOrHR && !isEmployee) {
    return (
      <div className="p-4">You are not authorized to view this page.</div>
    );
  }

  const handleAddHoliday = useCallback(() => {
    onOpen();
  }, [onOpen]);

  const holidayConfig = useMemo(
    () => ({
      appName: "EmpTrack",
      portalName: isAdminOrHR ? "Admin Portal" : "Employee Portal",
      variant: isAdminOrHR ? "admin" : "employee", // ✅ FIXED: Correct conditional value
      user: {
        name:
          user?.name ||
          (userType === "employee" ? "Employee" : "Admin"),
        role: user?.role || "Unknown Role",
        id: user?.id || "",
      },
    }),
    [user, userType, role, isAdminOrHR]
  );

  return (
    <DashboardLayout
      config={holidayConfig}
      actionButton={
        userType === "admin"
          ? {
              label: "Add Holiday",
              onClick: handleAddHoliday,
            }
          : undefined
      }
      searchPlaceholder="Search Holiday"
      minimalLayout
    >
      <div className="w-full max-w-full overflow-hidden">
        <div className="space-y-4 sm:space-y-6 px-3 sm:px-4 md:px-6 lg:px-8 pb-6 sm:pb-8 md:pb-10">
          {/* Header for small screens */}
          <div className="flex flex-col space-y-2 sm:hidden">
            <h1 className="text-lg font-semibold text-slate-900">
              Holiday Management
            </h1>
            <p className="text-sm text-slate-600">
              {userType === "admin"
                ? "Manage company and general holidays"
                : "View upcoming holidays"}
            </p>
          </div>

          {/* Shared holiday table */}
          <div className="w-full">
            <HolidayTable />
          </div>
        </div>
      </div>

      {/* Modal for admins */}
      {userType === "admin" && isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 bg-slate-50/50">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Add Holiday
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Create a new holiday entry
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                <HolidayForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default HolidayPage;
