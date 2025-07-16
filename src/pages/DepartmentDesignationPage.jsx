import { DashboardLayout } from "@/components/dashboardComponents/DashboardLayout";
import { DepartmentCard } from "@/components/departmentDesignationComponents/DepartmentCard";
import DepartmentForm from "@/components/departmentDesignationComponents/DepartmentForm";
import Spinner from "@/components/ui/Spinner";
import { useDepartments } from "@/hooks/useDepartments";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useCallback, useMemo, useState } from "react";


const DepartmentDesignationPage = () => {
  const user = useAuthStore((state) => state.user);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDepartment = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { departments, refetch, loading } = useDepartments();

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
      actionButton={{
        label: "Add Department",
        onClick: handleAddDepartment,
      }}
      minimalLayout
    >
      <section className="px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 tracking-tight">
          Department Management
        </h1>

        <p className="text-slate-600 mt-1 text-sm">
          Manage your departments and view associated designations.
        </p>

        <div className="mt-6 min-h-[300px] flex items-center justify-center">
          {loading ? (
            <div className="min-h-[200px] flex items-center justify-center">
              <Spinner
                size="48px"
                color="border-purple-500"
                label="Loading Departments..."
              />
            </div>
          ) : departments.length === 0 ? (
            <div className="text-center text-slate-500 py-10">
              No departments found. Try adding one.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {departments.map((dept) => (
                <DepartmentCard
                  key={dept.id}
                  department={dept}
                  refetch={refetch}
                />
              ))}
            </div>
          )}
        </div>
      </section>

    
   {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md px-3 sm:px-4 md:px-6 py-4 sm:py-6">
    
    {/* Backdrop with lower z-index */}
    <div 
      className="absolute inset-0 z-0 animate-in fade-in duration-300"
      onClick={handleCloseModal}
    />

    {/* Modal Box */}
    <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg p-0 bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 max-h-[90vh] sm:max-h-[85vh] overflow-hidden">
      
      {/* Header */}
      <div className="relative p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 to-white/40 rounded-t-2xl sm:rounded-t-3xl z-0" />
        
        {/* Cross Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 hover:text-slate-800 transition-all duration-200 backdrop-blur-sm group"
          aria-label="Close Modal"
        >
          <svg 
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:rotate-90" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative pr-8 sm:pr-10 z-10">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1">Add Department</h2>
          <p className="text-xs sm:text-sm text-slate-500">Create a new department entry</p>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-4 sm:p-6 pt-3 sm:pt-4 max-h-[calc(90vh-120px)] sm:max-h-[calc(85vh-120px)] overflow-y-auto z-10">
        <DepartmentForm onClose={handleCloseModal} refetch={refetch} />
      </div>

      {/* Bottom Border Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  </div>
)}
    </DashboardLayout>
  );
};

export default DepartmentDesignationPage;
