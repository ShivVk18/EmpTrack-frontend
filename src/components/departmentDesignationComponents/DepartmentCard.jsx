import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import api from "@/utils/axiosInstance";
import { toast } from "sonner";
import { Trash2, Eye, Building2 } from "lucide-react";

export const DepartmentCard = ({ department, refetch }) => {
  const navigate = useNavigate();

  const handleDeleteDepartment = async (id) => {
    try {
      const res = await api.delete(`/department/${id}`);
      if (res.data.success) {
        toast.success("Department deleted successfully");
        refetch?.();
      }
    } catch {
      toast.error("Failed to delete department");
    }
  };

  const handleViewDetails = () => {
    
    navigate(
      `/admin/dashboard/department-designation/department/${department.id}`
    );
  };

  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-500 flex flex-col justify-between min-h-[340px] sm:min-h-[300px] md:min-h-[320px] transform hover:-translate-y-[2px]">
     
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-slate-50/0 group-hover:from-blue-50/30 group-hover:to-slate-50/20 transition-all duration-500 pointer-events-none" />

      
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start gap-3">
          
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Building2 className="w-5 h-5 text-white" />
          </div>

          {/* Title & Code */}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-slate-900 text-base sm:text-lg font-semibold truncate leading-tight">
              {department.name}
            </CardTitle>
            <p className="text-slate-500 text-sm font-medium truncate mt-1">
              {department.code}
            </p>
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col justify-between gap-4 h-full relative z-10 px-4 sm:px-6 pb-5">
        {/* Description */}
        <div className="text-sm text-slate-700 leading-relaxed line-clamp-3">
          {department.description || "No description provided."}
        </div>

        {/* Designation Pills */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {department.designations?.slice(0, 3).map((desig) => (
              <span
                key={desig.id}
                className="text-xs px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full font-medium hover:bg-blue-200 transition-colors"
              >
                {desig.name}
              </span>
            ))}
            {department.designations?.length > 3 && (
              <span className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full font-medium">
                +{department.designations.length - 3} more
              </span>
            )}
          </div>

          {/* Meta */}
          <div className="text-xs text-slate-500">
            <span className="font-medium">Designations:</span>{" "}
            <span className="font-semibold text-slate-700">
              {department.designations?.length || 0}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-gray-100">
          <Button
            size="sm"
            variant="outline"
            className="w-full sm:w-auto border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all group/delete"
            onClick={() => handleDeleteDepartment(department.id)}
          >
            <span className="flex items-center justify-center gap-1">
              <Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
              <span>Delete</span>
            </span>
          </Button>

          <Button
            size="sm"
            variant="default"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-sm hover:shadow-md transition-all group/view"
            onClick={handleViewDetails}
          >
            <span className="flex items-center justify-center gap-1">
              <Eye className="w-4 h-4 group-hover/view:scale-110 transition-transform" />
              <span>View</span>
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
