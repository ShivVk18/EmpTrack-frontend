import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import Spinner from "../ui/Spinner";
import { Card } from "../ui/card";
import { toast } from "sonner";
import { Trash2, CalendarDays, Pencil } from "lucide-react";
import api from "@/utils/axiosInstance";
import { PaginationControls } from "../departmentDesignationComponents/PaginationControls";


import { useEffect } from "react";
import { useleavePolicy } from "@/store/useLeavePolicy";
import { useLeavePolicies } from "@/hooks/useLeavePolicy";


const LeavePolicyField = () => {
  const { leavePolicies, pagination, loading, refetch } = useLeavePolicies(); 
  const setPage = useleavePolicy((state) => state.setPage); 

  const {onOpen} = useleavePolicy()
  const shouldRefetchAfterAdd = useleavePolicy((state) => state.shouldRefetchAfterAdd);
  const setShouldRefetchAfterAdd = useleavePolicy((state) => state.setShouldRefetchAfterAdd);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/leavePolicy/${id}`);
      toast.success("Leave policy deleted successfully!");

      const nextPage =
        leavePolicies.length === 1 && pagination.currentPage > 1
          ? pagination.currentPage - 1
          : pagination.currentPage;

      await refetch(nextPage);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete leave policy.");
    }
  };

  const handleEdit = (policy) => {
    
    console.log("Editing policy:", policy);
    toast.info(`Editing leave policy: ${policy.leaveType}`);
     onOpen(policy.id)
  };

  useEffect(() => {
    if (shouldRefetchAfterAdd) {
      refetch();
      setShouldRefetchAfterAdd(false);
    }
  }, [shouldRefetchAfterAdd]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <Spinner size="48px" />
          <p className="text-slate-500 text-sm">Loading leave policies...</p>
        </div>
      </div>
    );
  }

  if (leavePolicies.length === 0) {
    return (
      <Card className="p-6 sm:p-10 text-center border-dashed border-2 border-slate-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
            <CalendarDays className="w-8 h-8 text-slate-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">
              No Leave Policies Found
            </h3>
            <p className="text-slate-500 text-sm max-w-md">
              You haven't created any leave policies yet. Add one to get started.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const formatBoolean = (val) => (val ? "Yes" : "No");

  return (
    <div className="w-full space-y-6">
      <Card className="overflow-hidden border-0 shadow ring-1 ring-slate-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 text-slate-700">
                <TableHead>S.No</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Days Allowed</TableHead>
                <TableHead>Carry Forward</TableHead>
                <TableHead>Max Carry Days</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leavePolicies.map((policy, index) => (
                <TableRow key={policy.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{policy.leaveType}</TableCell>
                  <TableCell>{policy.daysAllowed}</TableCell>
                  <TableCell>{formatBoolean(policy.carryForward)}</TableCell>
                  <TableCell>{policy.maxCarryForwardDays ?? "-"}</TableCell>
                  <TableCell>{formatBoolean(policy.isPaid)}</TableCell>
                  <TableCell>{formatBoolean(policy.isActive)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(policy)}
                      className="h-8 px-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                    >
                      <Pencil className="w-4 h-4" />
                      <span className="ml-1 hidden xl:inline">Edit</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(policy.id)}
                      className="h-8 px-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="ml-1 hidden xl:inline">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-center pt-2 px-4">
          <div className="w-full max-w-md">
            <PaginationControls pagination={pagination} setPage={setPage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LeavePolicyField;