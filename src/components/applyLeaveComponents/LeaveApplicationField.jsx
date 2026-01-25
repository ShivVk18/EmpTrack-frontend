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

import {  CalendarDays,  } from "lucide-react";

import { PaginationControls } from "../departmentDesignationComponents/PaginationControls";


import { useEffect } from "react";
import { useleaveApplication } from "@/store/useLeaveApplicationStore";
import { useOwnleaveApplication } from "@/hooks/useOwnleaveApplication";


const LeaveApplicationField = () => {
  const { leaveApplications, pagination, loading, refetch } = useOwnleaveApplication(); 
  const setPage = useleaveApplication((state) => state.setPage); 
   
  
  const shouldRefetchAfterAdd = useleaveApplication((state) => state.shouldRefetchAfterAdd);
  const setShouldRefetchAfterAdd = useleaveApplication((state) => state.setShouldRefetchAfterAdd);

  
  console.log(leaveApplications)

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
          <p className="text-slate-500 text-sm">Loading leave application...</p>
        </div>
      </div>
    );
  }

  if (leaveApplications.length === 0) {
    return (
      <Card className="p-6 sm:p-10 text-center border-dashed border-2 border-slate-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
            <CalendarDays className="w-8 h-8 text-slate-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">
              No Leave Applications Found
            </h3>
            <p className="text-slate-500 text-sm max-w-md">
              You haven't have any applied leave
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
      <TableHead>S.no</TableHead>
      <TableHead>Leave Type</TableHead>
      <TableHead>From</TableHead>
      <TableHead>To</TableHead>
      <TableHead>Half Day</TableHead>
      <TableHead>Session</TableHead>
      <TableHead>Reason</TableHead>
      <TableHead>Status</TableHead>
      
    </TableRow>
  </TableHeader>
  <TableBody>
    {leaveApplications.map((app, index) => (
      <TableRow key={app.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{app.leavePolicy?.leaveType ?? "-"}</TableCell>
        <TableCell>{new Date(app.fromDate).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(app.toDate).toLocaleDateString()}</TableCell>
        <TableCell>{app.isHalfDay ? "Yes" : "No"}</TableCell>
        <TableCell>{app.isHalfDay ? app.session : "-"}</TableCell>
        <TableCell>{app.reason}</TableCell>
        <TableCell>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium
              ${
                app.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : app.status === "APPROVED"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {app.status}
          </span>
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

export default LeaveApplicationField;