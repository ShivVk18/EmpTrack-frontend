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
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { toast } from "sonner";
import { 
  Calendar, 
  CalendarDays, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Filter,
  X
} from "lucide-react";
import api from "@/utils/axiosInstance";
import { PaginationControls } from "../departmentDesignationComponents/PaginationControls";
import { useEffect, useState } from "react";

const OwnAttendanceTable = () => {
  const [attendances, setAttendances] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 20
  });
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    from: '',
    to: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const fetchAttendance = async (page = 1, filterParams = filters) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...(filterParams.from && { from: filterParams.from }),
        ...(filterParams.to && { to: filterParams.to }),
      });

      const response = await api.get(`/attendance/own?${params}`);
      const { attendances: data, totalCount, page: currentPage, limit } = response.data.data;
      
      setAttendances(data);
      setPagination({
        page: Number(currentPage),
        totalPages: Math.ceil(totalCount / limit),
        totalCount,
        limit
      });
    } catch (error) {
      console.error('Error fetching attendance:', error);
      toast.error('Failed to fetch attendance data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchAttendance(1, filters);
  };

  const clearFilters = () => {
    const clearedFilters = { from: '', to: '' };
    setFilters(clearedFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchAttendance(1, clearedFilters);
  };

  const setPage = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    fetchAttendance(newPage, filters);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return 'N/A';
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PRESENT: {
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        text: "Present"
      },
      ABSENT: {
        color: "bg-red-100 text-red-800",
        icon: XCircle,
        text: "Absent"
      },
      LATE: {
        color: "bg-yellow-100 text-yellow-800",
        icon: AlertCircle,
        text: "Late"
      },
      HALF_DAY: {
        color: "bg-blue-100 text-blue-800",
        icon: Clock,
        text: "Half Day"
      }
    };

    const config = statusConfig[status] || statusConfig.ABSENT;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </span>
    );
  };

  const calculateHoursWorked = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 'N/A';
    
    const checkInTime = new Date(`2000-01-01T${checkIn}`);
    const checkOutTime = new Date(`2000-01-01T${checkOut}`);
    
    const diffMs = checkOutTime - checkInTime;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <Spinner size="48px" />
          <p className="text-slate-500 text-sm">Loading attendance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="space-y-4 sm:space-y-6">
        {/* Filter Section */}
        <Card className="p-4 border-0 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              My Attendance Records
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </span>
            </Button>
          </div>

          {showFilters && (
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from-date" className="text-sm font-medium text-slate-700">
                    From Date
                  </Label>
                  <Input
                    id="from-date"
                    type="date"
                    value={filters.from}
                    onChange={(e) => handleFilterChange('from', e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="to-date" className="text-sm font-medium text-slate-700">
                    To Date
                  </Label>
                  <Input
                    id="to-date"
                    type="date"
                    value={filters.to}
                    onChange={(e) => handleFilterChange('to', e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="flex items-end space-x-2">
                  <Button onClick={applyFilters} className="flex-1">
                    Apply Filters
                  </Button>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="flex-1 flex items-center justify-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {attendances.length === 0 ? (
          <Card className="p-4 sm:p-8 text-center border-dashed border-2 border-slate-200">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <CalendarDays className="w-8 h-8 text-slate-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-slate-900">
                  No attendance records found
                </h3>
                <p className="text-slate-500 text-sm max-w-md">
                  {filters.from || filters.to 
                    ? "No attendance records found for the selected date range."
                    : "No attendance records available yet."
                  }
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <Card className="overflow-hidden border-0 shadow-sm ring-1 ring-slate-200">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                        <TableHead className="font-semibold text-slate-700 py-4 min-w-[80px]">
                          S.No.
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 py-4 min-w-[120px]">
                          Date
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 py-4 min-w-[100px]">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 py-4 min-w-[100px]">
                          Check In
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 py-4 min-w-[100px]">
                          Check Out
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 py-4 min-w-[120px]">
                          Hours Worked
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 py-4 min-w-[200px]">
                          Notes
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendances.map((attendance, index) => (
                        <TableRow
                          key={attendance.id}
                          className="hover:bg-slate-50/50 transition-colors duration-150"
                        >
                          <TableCell className="py-4 font-medium text-slate-600">
                            {((pagination.page - 1) * pagination.limit) + index + 1}
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-2">
                              <CalendarDays className="w-4 h-4 text-slate-400" />
                              <span className="text-slate-700 font-medium">
                                {formatDate(attendance.date)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            {getStatusBadge(attendance.status)}
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="text-slate-700 font-mono text-sm">
                              {formatTime(attendance.checkInTime)}
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="text-slate-700 font-mono text-sm">
                              {formatTime(attendance.checkOutTime)}
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="text-slate-700 font-medium">
                              {calculateHoursWorked(attendance.checkInTime, attendance.checkOutTime)}
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="text-slate-600 text-sm">
                              {attendance.notes || 'No notes'}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>

            {/* Tablet Table */}
            <div className="hidden md:block lg:hidden">
              <Card className="overflow-hidden border-0 shadow-sm ring-1 ring-slate-200">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
                        <TableHead className="font-semibold text-slate-700 py-4 min-w-[120px]">
                          Date
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 py-4 min-w-[100px]">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 py-4 min-w-[100px]">
                          Check In
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 py-4 min-w-[100px]">
                          Check Out
                        </TableHead>
                        <TableHead className="font-semibold text-slate-700 py-4 min-w-[120px]">
                          Hours
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendances.map((attendance, index) => (
                        <TableRow
                          key={attendance.id}
                          className="hover:bg-slate-50/50 transition-colors duration-150"
                        >
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-2">
                              <CalendarDays className="w-4 h-4 text-slate-400" />
                              <div>
                                <span className="text-slate-700 font-medium text-sm">
                                  {formatDate(attendance.date)}
                                </span>
                                <p className="text-slate-500 text-xs">
                                  #{((pagination.page - 1) * pagination.limit) + index + 1}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            {getStatusBadge(attendance.status)}
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="text-slate-700 font-mono text-sm">
                              {formatTime(attendance.checkInTime)}
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="text-slate-700 font-mono text-sm">
                              {formatTime(attendance.checkOutTime)}
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="text-slate-700 font-medium text-sm">
                              {calculateHoursWorked(attendance.checkInTime, attendance.checkOutTime)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>

            {/* Mobile Card Layout */}
            <div className="block md:hidden">
              <div className="space-y-3">
                {attendances.map((attendance, index) => (
                  <Card key={attendance.id} className="p-4 w-full">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-500 text-xs font-medium">
                            #{((pagination.page - 1) * pagination.limit) + index + 1}
                          </span>
                          {getStatusBadge(attendance.status)}
                        </div>
                        <div className="flex items-center space-x-1">
                          <CalendarDays className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-600 text-sm font-medium">
                            {formatDate(attendance.date)}
                          </span>
                        </div>
                      </div>

                      {/* Time Details */}
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                        <div>
                          <div className="flex items-center space-x-1 mb-1">
                            <Clock className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-slate-500 font-medium">Check In</span>
                          </div>
                          <span className="text-slate-700 font-mono text-sm">
                            {formatTime(attendance.checkInTime)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-1 mb-1">
                            <Clock className="w-3 h-3 text-red-500" />
                            <span className="text-xs text-slate-500 font-medium">Check Out</span>
                          </div>
                          <span className="text-slate-700 font-mono text-sm">
                            {formatTime(attendance.checkOutTime)}
                          </span>
                        </div>
                      </div>

                      {/* Hours and Notes */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-500 font-medium">Hours Worked</span>
                          <span className="text-slate-700 font-medium text-sm">
                            {calculateHoursWorked(attendance.checkInTime, attendance.checkOutTime)}
                          </span>
                        </div>
                        {attendance.notes && (
                          <div>
                            <span className="text-xs text-slate-500 font-medium">Notes:</span>
                            <p className="text-slate-600 text-sm mt-1">{attendance.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center pt-4 px-4">
                <div className="w-full max-w-md">
                  <PaginationControls pagination={pagination} setPage={setPage} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OwnAttendanceTable;