import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Spinner from "../ui/Spinner";

import { Card } from "../ui/card";
import api from "@/utils/axiosInstance";
import { toast } from "sonner";
import { Edit, Trash2, Users } from "lucide-react";

import { PaginationControls } from "../departmentDesignationComponents/PaginationControls";
import { useEmployeesTableData } from "@/hooks/useEmployeeTableData";
import { useEmployeeStore } from "@/store/useEmployeeStore";
import AddEmployeeForm from "./AddEmployeeForm";
import {   Mail, Building, UserCheck, Shield } from "lucide-react";

const EmployeeTable = ({ filters = {}, onUpdate }) => {
  const { employees, pagination, loading, fetchEmployees, setPage } =
    useEmployeesTableData(filters);
    
    const {openModal,isModalOpen} = useEmployeeStore()

  const onDelete = async (id) => {
    try {
      const res = await api.delete(`/employee/${id}`);
      if (res.data.success) {
        toast.success("Employee deleted successfully");

        const nextPage =
          employees.length === 1 && pagination.page > 1
            ? pagination.page - 1
            : pagination.page;

        setPage((prev) => {
          if (prev.page === nextPage) {
            fetchEmployees(nextPage);
            return prev;
          }
          return { ...prev, page: nextPage };
        });

        if (onUpdate) onUpdate();
      }
    } catch {
      toast.error("Failed to delete employee");
    }
  };

  const onEdit = (id) => {
    openModal(id)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <Spinner size="48px" />
          <p className="text-slate-500 text-sm">Loading employees...</p>
        </div>
      </div>
    );
  } 

  if (employees.length === 0) {
    return (
      <Card className="p-4 sm:p-8 text-center border-dashed border-2 border-slate-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-slate-900">
              No employees found
            </h3>
            <p className="text-slate-500 text-sm max-w-md">
              Try adjusting your filters or add new employees to see them here.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
     <div className="space-y-6">
      {/* Mobile Card Layout */}
      <div className="block lg:hidden space-y-4">
        {employees.map((emp) => (
          <Card key={emp.id} className="p-4 border border-slate-200 hover:shadow-md transition-shadow duration-200">
            <div className="space-y-4">
              {/* Header with name and status */}
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 truncate text-lg">
                    {emp.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600 truncate">{emp.email}</span>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ml-2 ${
                    emp.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {emp.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Department</span>
                  </div>
                  <p className="font-medium text-slate-900 pl-6">
                    {emp.department?.name || "-"}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <UserCheck className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Designation</span>
                  </div>
                  <p className="font-medium text-slate-900 pl-6">
                    {emp.designation?.name || "-"}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Type</span>
                  </div>
                  <p className="font-medium text-slate-900 pl-6">{emp.type}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Role</span>
                  </div>
                  <p className="font-medium text-slate-900 pl-6">{emp.role}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(emp.id)}
                  className="flex-1 sm:flex-none h-9 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(emp.id)}
                  className="flex-1 sm:flex-none h-9 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden lg:block">
        <Card className="overflow-hidden border-0 shadow-sm ring-1 ring-slate-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                <TableHead className="font-semibold text-slate-700 py-4">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">
                  Department
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">
                  Designation
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">
                  Type
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">
                  Role
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {employees.map((emp) => (
                <TableRow
                  key={emp.id}
                  className="hover:bg-slate-50/50 transition-colors duration-150 group"
                >
                  <TableCell className="py-4 font-medium text-slate-900">
                    {emp.name}
                  </TableCell>
                  <TableCell className="py-4 text-slate-600 text-sm">
                    {emp.email}
                  </TableCell>
                  <TableCell className="py-4">
                    {emp.department?.name || "-"}
                  </TableCell>
                  <TableCell className="py-4">
                    {emp.designation?.name || "-"}
                  </TableCell>
                  <TableCell className="py-4">{emp.type}</TableCell>
                  <TableCell className="py-4">{emp.role}</TableCell>
                  <TableCell className="py-4">
                    <span
                      className={`text-sm px-2 py-1 rounded-md font-medium ${
                        emp.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(emp.id)}
                        className="h-8 px-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span className="ml-1 hidden xl:inline">Edit</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(emp.id)}
                        className="h-8 px-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="ml-1 hidden xl:inline">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
      
       {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl relative">
            <AddEmployeeForm
              refetch={() => {
                fetchEmployees();
                onUpdate?.();
              }}
              enabled={true}
            />
          </div>
        </div>
      )}

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-center pt-4">
          <PaginationControls pagination={pagination} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
