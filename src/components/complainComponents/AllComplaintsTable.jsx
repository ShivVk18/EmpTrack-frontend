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
import { useAllEmployeeComplaints } from "@/hooks/useAllEmployeeComplaints";
import { useState } from "react";
import api from "@/utils/axiosInstance";

const statusOptions = ["PENDING", "IN_PROGRESS", "RESOLVED", "REJECTED"];

const AllComplaintsTable = () => {
  const {
    complaints,
    loading,
    totalPages,
    currentPage,
    setCurrentPage,
    refetch,
  } = useAllEmployeeComplaints();

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    if (!selectedComplaint) return;

    setUpdating(true);
    try {
      await api.patch(`/complaints/${selectedComplaint.id}`, {
        status,
        remarks,
      });
      await refetch();
      setSelectedComplaint(null);
      setStatus("");
      setRemarks("");
    } catch (err) {
      alert("Failed to update complaint");
    } finally {
      setUpdating(false);
    }
  };

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
              No complaints raised by any employee.
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
                <TableHead>Employee</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Raised At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint, index) => (
                <TableRow key={complaint.id}>
                  <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                  <TableCell>
                    <div className="font-semibold">{complaint.employee.name}</div>
                    <div className="text-xs text-gray-500">{complaint.employee.department?.name}</div>
                  </TableCell>
                  <TableCell>{complaint.subject}</TableCell>
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
                  <TableCell>
                    <button
                      onClick={() => {
                        setSelectedComplaint(complaint);
                        setStatus(complaint.status);
                        setRemarks(complaint.remarks || "");
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
      {totalPages > 1 && (
        <div className="flex justify-center pt-2 px-4">
          <div className="w-full max-w-md">
            <PaginationControls
              pagination={{ currentPage, totalPages }}
              setPage={setCurrentPage}
            />
          </div>
        </div>
      )}

      {/* Update Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-6">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Update Complaint – {selectedComplaint.subject}
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

            <label className="block text-sm font-medium mb-1">Remarks</label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedComplaint(null)}
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

export default AllComplaintsTable;
