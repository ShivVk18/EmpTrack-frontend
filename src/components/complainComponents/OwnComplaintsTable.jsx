import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card } from "../ui/card";
import Spinner from "../ui/Spinner";
import { Bell } from "lucide-react";
import { PaginationControls } from "../departmentDesignationComponents/PaginationControls";

import { useEmployeeComplaints } from "@/hooks/useEmployeeComplaints";
import { useEffect } from "react";
import { useComplaintsStore } from "@/store/useComplaintsStore";

const OwnComplaintsTable = () => {
  const {
    complaints,
    loading,
    totalPages,
    currentPage,
    setCurrentPage,
    refetch
  } = useEmployeeComplaints();  


   const shouldRefetchAfterAdd = useComplaintsStore((state) => state.shouldRefetchAfterAdd);
  const setShouldRefetchAfterAdd = useComplaintsStore((state) => state.setShouldRefetchAfterAdd);
  
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
          <p className="text-slate-500 text-sm">Loading complaints...</p>
        </div>
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <Card className="p-6 sm:p-10 text-center border-dashed border-2 border-slate-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
            <Bell className="w-8 h-8 text-slate-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">
              No Complaints Found
            </h3>
            <p className="text-slate-500 text-sm max-w-md">
              You haven’t raised any complaints yet. All your complaints will
              appear here.
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
              <TableRow className="bg-slate-50 text-slate-700">
                <TableHead>S.No</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Raised At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint, index) => (
                <TableRow key={complaint.id}>
                  <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                  <TableCell>{complaint.subject}</TableCell>
                  <TableCell className="max-w-xs break-words">
                    {complaint.description}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        complaint.status === "RESOLVED"
                          ? "text-green-700 bg-green-100"
                          : complaint.status === "REJECTED"
                          ? "text-red-700 bg-red-100"
                          : complaint.status === "IN_PROGRESS"
                          ? "text-yellow-700 bg-yellow-100"
                          : "text-slate-700 bg-slate-100"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(complaint.raisedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-2 px-4">
          <div className="w-full max-w-md">
            <PaginationControls
              pagination={{
                currentPage,
                totalPages,
              }}
              setPage={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnComplaintsTable;
