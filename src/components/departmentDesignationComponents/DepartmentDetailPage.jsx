import api from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DesigantionTable from "./DesigantionTable";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Spinner from "../ui/Spinner";
import { Building2, ArrowLeft, PencilLine, Plus, Users, FileText, Target } from "lucide-react";
import DepartmentForm from "./DepartmentForm";
import { useDesignationModalStore } from "@/store/useDesignationModalStore";
import DesignationForm from "./DesignationForm";

const DepartmentDetailPage = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const {openModal,isModalOpen} = useDesignationModalStore()
 
    
  const fetchDepartment = async () => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 600)); 
      const res = await api.get(`/department/${id}`);
      setDepartment(res.data?.data);
    } catch (error) {
      console.error("Failed to fetch department", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[400px] space-y-4 px-4">
         <Spinner size="48px" color="border-purple-500" label="Loading Departments..." />
      </div>
    );
  }

  if (!department) {
    return (
      <div className="flex flex-col justify-center items-center h-[400px] space-y-4 px-4">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <Building2 className="w-8 h-8 text-red-500" />
        </div>
        <p className="text-red-500 font-medium text-lg text-center">Department not found</p>
      </div>
    );
  }

  const onEdit = () => {
       setIsEditModalOpen(true)
       
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-6 space-y-3 sm:space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 shadow-lg sm:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
          <div className="relative p-3 sm:p-4 lg:p-6 xl:p-8">
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
              <div className="flex gap-2 sm:gap-3 lg:gap-4 items-start">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg flex-shrink-0">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white mb-1 sm:mb-2 break-words leading-tight">
                    {department.name}
                  </h1>
                  <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 text-blue-100">
                    <span className="text-xs sm:text-sm font-medium">Department Code:</span>
                    <span className="px-2 py-1 bg-white/20 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold inline-block w-fit">
                      {department.code}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3 flex-wrap">
                <Button
                  variant="secondary"
                  onClick={() => window.history.back()}
                  className="flex items-center gap-1 sm:gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 transition-all duration-200 text-xs sm:text-sm px-3 py-2 h-auto"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Back</span>
                </Button>
                <Button
                  variant="outline"
                   onClick={()=>onEdit()}
                  className="flex items-center gap-1 sm:gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 transition-all duration-200 text-xs sm:text-sm px-3 py-2 h-auto"
                >
                  <PencilLine className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Edit Details</span>
                  <span className="xs:hidden">Edit</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <Card className="group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">
                  {department._count.designations}
                </span>
              </div>
              <h3 className="text-slate-600 font-medium text-xs sm:text-sm lg:text-base">Total Designations</h3>
            </div>
          </Card>

          <Card className="group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border-0">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">
                  {department._count.employees}
                </span>
              </div>
              <h3 className="text-slate-600 font-medium text-xs sm:text-sm lg:text-base">Total Employees</h3>
            </div>
          </Card>

          <Card className="group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border-0 sm:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">
                   {Math.round(department._count.employees / department._count.designations) || 0}
                </span>
              </div>
              <h3 className="text-slate-600 font-medium text-xs sm:text-sm lg:text-base">Avg per Designation</h3>
            </div>
          </Card>
        </div>

        
        <Card className="rounded-lg sm:rounded-xl lg:rounded-2xl bg-white shadow-md border-0 overflow-hidden">
          <div className="p-3 sm:p-4 lg:p-6 xl:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
              <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-md sm:rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                <FileText className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white" />
              </div>
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-slate-800">Department Information</h2>
            </div>
            
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-md sm:rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6">
              <p className="text-xs sm:text-sm text-slate-500 mb-2 font-medium">Description</p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {department.description || "No description provided."}
              </p>
            </div>
          </div>
        </Card>

       
        <Card className="rounded-lg sm:rounded-xl lg:rounded-2xl bg-white shadow-md border-0 overflow-hidden">
          <div className="p-3 sm:p-4 lg:p-6 xl:p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4 lg:mb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-md sm:rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <Target className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white" />
                </div>
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-slate-800">
                  Designations
                </h2>
              </div>
              
              <Button 
                className="flex items-center gap-2 bg-gradient-to-r shadow-md hover:shadow-lg transition-all duration-200 rounded-lg sm:rounded-xl text-xs sm:text-sm lg:text-base w-full sm:w-auto justify-center px-3 py-2 h-auto"
                onClick={() => {
    console.log("Add Designation clicked", department.name);
    openModal(null, department.name);
  }}
                variant='default'
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Add Designation</span>
                <span className="xs:hidden">Add</span>
              </Button>
            </div>

            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-md sm:rounded-lg lg:rounded-xl p-1">
              <div className="bg-white rounded-md sm:rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    <DesigantionTable departmentId={id} onUpdate={fetchDepartment} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
      </div>
      {isEditModalOpen && (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
    <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative shadow-2xl">
      <DepartmentForm
        
        onClose={() => setIsEditModalOpen(false)}
        refetch={fetchDepartment}
        enabled={true} 
      />
    </div>
  </div> 


)}  

{isModalOpen && (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
    <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative shadow-2xl">
      <DesignationForm  refetch={fetchDepartment} />
    </div>
  </div>
)}
    </div>
  );
};

export default DepartmentDetailPage;