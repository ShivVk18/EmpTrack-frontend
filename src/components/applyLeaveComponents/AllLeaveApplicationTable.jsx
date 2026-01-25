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

import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import { useAllLeaveApplication } from "@/hooks/useAllLeaveApplication";
import { useleaveApplication } from "@/store/useLeaveApplicationStore";

const statusOptions = ["PENDING", "APPROVED", "REJECTED", "CANCELLED"];

const AllLeaveApplicationTable = () => {
  const { leaveApplications, pagination, loading, refetch } =
    useAllLeaveApplication();
  const setPage = useleaveApplication((state) => state.setPage);

  const shouldRefetchAfterAdd = useleaveApplication(
    (state) => state.shouldRefetchAfterAdd
  );
  const setShouldRefetchAfterAdd = useleaveApplication(
    (state) => state.setShouldRefetchAfterAdd
  );

  console.log(leaveApplications);

  useEffect(() => {
    if (shouldRefetchAfterAdd) {
      refetch();
      setShouldRefetchAfterAdd(false);
    }
  }, [shouldRefetchAfterAdd]);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [status, setStatus] = useState("");

  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    if (!selectedApplication) return;

    setUpdating(true);
    try {
      await api.put(`/leaveApplication/${selectedApplication.id}`, {
        status,
      });
      await refetch();
      setSelectedApplication(null);
      setStatus("");
    } catch (err) {
      alert("Failed to update Application", err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <Spinner size="48px" />
          <p className="text-slate-500 text-sm">Loading Leaves applications</p>
        </div>
      </div>
    );
  }

  if (leaveApplications.length === 0) {
    return (
      <Card className="p-6 sm:p-10 text-center border-dashed border-2 border-slate-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
            <Bell className="w-8 h-8 text-slate-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">
              No Application Found
            </h3>
            <p className="text-slate-500 text-sm max-w-md">
              No Leave applied by any employee.
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
                <TableHead>S No.</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Half Day</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveApplications.map((app, index) => (
                <TableRow key={app.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{app.employee.name}</TableCell>
                  <TableCell>{app.employee.employeeCode}</TableCell>
                  <TableCell>{app.leavePolicy?.leaveType ?? "-"}</TableCell>
                  <TableCell>
                    {new Date(app.fromDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(app.toDate).toLocaleDateString()}
                  </TableCell>
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
                  <TableCell>
                    <button
                      onClick={() => {
                        setSelectedApplication(app);
                        setStatus(app.status);
                      }}
                      className="text-sm text-blue-600 underline"
                    >
                      Update
                    </button>
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

      {/* Update Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-6">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Update Complaint – {selectedApplication.reason}
            </h3>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedApplication(null)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={updating}
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllLeaveApplicationTable;
