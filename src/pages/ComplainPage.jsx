import AllComplaintsTable from "@/components/complainComponents/AllComplaintsTable";
import OwnComplaintsTable from "@/components/complainComponents/OwnComplaintsTable";

import RaiseComplaintModal from "@/components/complainComponents/RaiseComplainForm";
import { DashboardLayout } from "@/components/dashboardComponents/DashboardLayout";
import { useAuthStore } from "@/store/useAuthStore";
import { useComplaintsStore } from "@/store/useComplaintsStore";
import React from "react";

const ComplainPage = () => {
  const { user, userType, role } = useAuthStore.getState();
  const { onOpen, isModalOpen } = useComplaintsStore();

  if (!user || !userType) return <div className="p-4">User not logged in</div>;

  const isAdminOrHR =
    userType === "admin" || ["HR", "MANAGER", "SR_MANAGER"].includes(role);

  const isEmployee =
    userType === "employee" ||
    ["EMPLOYEE", "ACCOUNTANT"].includes(role);

  if (!isAdminOrHR && !isEmployee) {
    return <div className="p-4">You are not authorized to view this page.</div>;
  }

  const complainConfig = () => ({
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
        config={complainConfig()}
        actionButton={
          isEmployee
            ? {
                label: "Raise Complaints",
                onClick: onOpen,
              }
            : undefined
        }
        minimalLayout
      >
        <div className="w-full px-4 sm:px-6 md:px-8 py-6 space-y-6">
          {/* Page Title */}
          <div className="sm:hidden text-xl font-semibold text-gray-800">
            {isAdminOrHR ? "All Employee Complaints" : "My Complaints"}
          </div>

          <div className="w-full">
            {isAdminOrHR ? <AllComplaintsTable /> : <OwnComplaintsTable />}
          </div>
        </div>

        
        {isModalOpen && isEmployee && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-6">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
              <div className="p-4 sm:p-6">
                <RaiseComplaintModal />
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </div>
  );
};

export default ComplainPage;
