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
import { Trash2, Settings2, Pencil } from "lucide-react";
import api from "@/utils/axiosInstance";
import { PaginationControls } from "../departmentDesignationComponents/PaginationControls";
import { useEffect, useState } from "react";
import { usePayParameterStore } from "@/store/usePayParameterStore";
import { usePayParameters } from "@/hooks/usePayParameters";

const PayParameterTable = () => {
  const { payParameters, pagination, loading, refetch } = usePayParameters();
  const { setPage, onOpen } = usePayParameterStore();
  const shouldRefetchAfterAdd = usePayParameterStore(
    (state) => state.shouldRefetchAfterAdd
  );
  const setShouldRefetchAfterAdd = usePayParameterStore(
    (state) => state.setShouldRefetchAfterAdd
  );
  const [deletingId, setDeletingId] = useState(null);
  const [isRefetching, setIsRefetching] = useState(false);

  const handleDelete = async (id) => {
    if (deletingId) return;

    setDeletingId(id);
    console.log("Starting delete for ID:", id);

    try {
      await api.delete(`/payroll/parameters/${id}`);
      console.log("Delete successful, calling refetch...");

      toast.success("Pay parameter deleted successfully!");

      // Show refetch loading
      setIsRefetching(true);

      // Calculate next page if current page becomes empty
      const nextPage =
        payParameters.length === 1 && pagination.currentPage > 1
          ? pagination.currentPage - 1
          : pagination.currentPage;

      // Set the page first if needed
      if (nextPage !== pagination.currentPage) {
        console.log(
          "Changing page from",
          pagination.currentPage,
          "to",
          nextPage
        );
        setPage(nextPage);
       
        setTimeout(async () => {
          await refetch();
          setIsRefetching(false);
        }, 100);
      } else {
       
        await refetch();
        setIsRefetching(false);
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete pay parameter.");
      setIsRefetching(false);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (param) => {
    onOpen(param.id);
  };

  
  useEffect(() => {
    if (shouldRefetchAfterAdd) {
      console.log("Refetching due to shouldRefetchAfterAdd");
      setIsRefetching(true);
      refetch().finally(() => {
        setIsRefetching(false);
        setShouldRefetchAfterAdd(false);
      });
    }
  }, [shouldRefetchAfterAdd, refetch, setShouldRefetchAfterAdd]);

  if (loading || isRefetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <Spinner size="48px" />
          <p className="text-slate-500 text-sm">
            {isRefetching
              ? "Updating pay parameters..."
              : "Loading pay parameters..."}
          </p>
        </div>
      </div>
    );
  }

  if (payParameters.length === 0) {
    return (
      <Card className="p-6 sm:p-10 text-center border-dashed border-2 border-slate-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
            <Settings2 className="w-8 h-8 text-slate-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">
              No Pay Parameters Found
            </h3>
            <p className="text-slate-500 text-sm max-w-md">
              Add pay parameters to manage payroll settings for departments and
              designations.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6">
      <Card className="overflow-hidden border-0 shadow ring-1 ring-slate-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 text-slate-700">
                <TableHead className="w-16">S.No</TableHead>
                <TableHead className="min-w-32">Employee Type</TableHead>
               
                <TableHead className="w-20 text-center">HRA</TableHead>
                <TableHead className="w-20 text-center">DA</TableHead>
                <TableHead className="w-20 text-center">TA</TableHead>
                <TableHead className="w-20 text-center">EPF</TableHead>
                <TableHead className="w-20 text-center">ESI</TableHead>
                <TableHead className="w-20 text-center">PTax</TableHead>
                <TableHead className="w-20 text-center">TDS</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payParameters.map((param, index) => (
                <TableRow key={param.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium text-slate-600">
                    {(pagination.currentPage - 1) * 10 + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {param.employeeType}
                  </TableCell>
                
                  <TableCell className="text-center">
                    {param.hra ?? 0}%
                  </TableCell>
                  <TableCell className="text-center">
                    {param.da ?? 0}%
                  </TableCell>
                  <TableCell className="text-center">
                    {param.ta ?? 0}%
                  </TableCell>
                  <TableCell className="text-center">
                    {param.epfRate ?? 0}%
                  </TableCell>
                  <TableCell className="text-center">
                    {param.esiRate ?? 0}%
                  </TableCell>
                  <TableCell className="text-center">
                    {param.professionalTaxRate ?? 0}%
                  </TableCell>
                  <TableCell className="text-center">
                    {param.tdsRate ?? 0}%
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(param)}
                        className="h-8 px-3 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                        disabled={!!deletingId || isRefetching}
                      >
                        <Pencil className="w-4 h-4" />
                        <span className="ml-1 hidden xl:inline">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(param.id)}
                        className="h-8 px-3 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                        disabled={!!deletingId || isRefetching}
                      >
                        {deletingId === param.id ? (
                          <Spinner size="16px" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        <span className="ml-1 hidden xl:inline">
                          {deletingId === param.id ? "Deleting..." : "Delete"}
                        </span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

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

export default PayParameterTable;
