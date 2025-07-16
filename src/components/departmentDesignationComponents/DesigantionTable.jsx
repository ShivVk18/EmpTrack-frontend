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
import { PaginationControls } from "./PaginationControls";
import { useDesignationTableData } from "@/hooks/useDesignationTableData";
import { Card } from "../ui/card";
import api from "@/utils/axiosInstance";
import { toast } from "sonner";
import { Edit, Trash2, Users, AlertCircle } from "lucide-react";

import DesignationForm from "./DesignationForm";
import { useDesignationModalStore } from "@/store/useDesignationModalStore";

const DesignationTable = ({ departmentId, onUpdate }) => {
  const { designations, pagination, loading, fetchDesignations, setPage } =
    useDesignationTableData(departmentId);
  
    const { openModal, isModalOpen } = useDesignationModalStore();


  const onDelete = async (id) => {
    try {
      const res = await api.delete(`/designation/${id}`);
      if (res.data.success) {
        toast.success("Designation deleted successfully");

        const nextPage =
          designations.length === 1 && pagination.page > 1
            ? pagination.page - 1
            : pagination.page;

        await fetchDesignations(nextPage);
        setPage(nextPage);

        if (onUpdate) onUpdate();
      }
    } catch {
      toast.error("Failed to delete designation");
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
          <p className="text-slate-500 text-sm">Loading designations...</p>
        </div>
      </div>
    );
  }

  if (designations.length === 0) {
    return (
      <Card className="p-4 sm:p-8 text-center border-dashed border-2 border-slate-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-slate-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-slate-900">
              No designations found
            </h3>
            <p className="text-slate-500 text-sm max-w-md">
              No designations have been created for this department yet. Create
              your first designation to get started.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <Card className="overflow-hidden border-0 shadow-sm ring-1 ring-slate-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                <TableHead className="font-semibold text-slate-700 py-4">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">
                  Code
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">
                  Description
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">
                  Level
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {designations.map((desig, _) => (
                <TableRow
                  key={desig.id}
                  className="hover:bg-slate-50/50 transition-colors duration-150 group"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-medium">
                          {desig.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {desig.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-sm font-mono">
                      {desig.code}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <p
                      className="text-slate-600 text-sm max-w-xs truncate"
                      title={desig.description}
                    >
                      {desig.description || "No description"}
                    </p>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-slate-700 font-medium">
                        Level {desig.level}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(desig.id)}
                        className="h-8 px-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span className="ml-1 hidden xl:inline">Edit</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(desig.id)}
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

      {/* Tablet Table */}
      <div className="hidden md:block lg:hidden">
        <Card className="overflow-hidden border-0 shadow-sm ring-1 ring-slate-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                <TableHead className="font-semibold text-slate-700 py-4">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">
                  Code
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4">
                  Level
                </TableHead>
                <TableHead className="font-semibold text-slate-700 py-4 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {designations.map((desig, _) => (
                <TableRow
                  key={desig.id}
                  className="hover:bg-slate-50/50 transition-colors duration-150 group"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-medium">
                          {desig.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 truncate">
                          {desig.name}
                        </p>
                        <p
                          className="text-slate-500 text-xs mt-1 truncate"
                          title={desig.description}
                        >
                          {desig.description || "No description"}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-sm font-mono">
                      {desig.code}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-slate-700 font-medium">
                        Level {desig.level}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(desig.id)}
                        className="h-8 px-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(desig.id)}
                        className="h-8 px-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {designations.map((desig, _) => (
          <Card key={desig.id} className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">
                    {desig.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-900 truncate text-sm">
                    {desig.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1 flex-wrap">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-xs font-mono">
                      {desig.code}
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-slate-600 text-xs">
                        Level {desig.level}
                      </span>
                    </div>
                  </div>
                  {desig.description && (
                    <p
                      className="text-slate-600 text-xs mt-1 truncate"
                      title={desig.description}
                    >
                      {desig.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-1 ml-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(desig.id)}
                  className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                >
                  <Edit className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(desig.id)}
                  className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div> 


      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl relative">
            <DesignationForm
              refetch={() => {
                fetchDesignations();
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

export default DesignationTable;
