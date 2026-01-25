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

import { toast } from "sonner";
import { Trash2, CalendarDays } from "lucide-react";
import api from "@/utils/axiosInstance";
import { PaginationControls } from "../departmentDesignationComponents/PaginationControls";
import { useHolidays } from "@/hooks/useHoliday";
import { useHolidayStore } from "@/store/useHolidayStore";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const HolidayTable = () => {
  const { holidays, pagination, loading, refetch } = useHolidays();
  const setPage = useHolidayStore((state) => state.setPage);

  const { role, userType } = useAuthStore.getState();
  const isEmployee = role === "EMPLOYEE" || userType === "employee";

  const shouldRefetchAfterAdd = useHolidayStore(
    (state) => state.shouldRefetchAfterAdd
  );
  const setShouldRefetchAfterAdd = useHolidayStore(
    (state) => state.setShouldRefetchAfterAdd
  );

  const handleDelete = async (id) => {
    try {
      await api.delete(`/holiday/${id}`);
      toast.success("Holiday deleted successfully!");
      const nextPage =
        holidays.length === 1 && pagination.page > 1
          ? pagination.page - 1
          : pagination.page;
      await refetch(nextPage);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete holiday.");
    }
  };

  useEffect(() => {
    if (shouldRefetchAfterAdd) {
      refetch();
      setShouldRefetchAfterAdd(false);
    }
  }, [shouldRefetchAfterAdd]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <Spinner size="48px" />
          <p className="text-slate-500 text-sm">Loading holidays...</p>
        </div>
      </div>
    );
  }

  if (holidays.length === 0) {
    return (
      <Card className="p-4 sm:p-8 text-center border-dashed border-2 border-slate-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
            <CalendarDays className="w-8 h-8 text-slate-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-slate-900">
              No holidays found
            </h3>
            <p className="text-slate-500 text-sm max-w-md">
              No holidays have been created yet. Add a holiday to get started.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="space-y-4 sm:space-y-6">
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
                    <TableHead className="font-semibold text-slate-700 py-4 min-w-[200px]">
                      Holiday Name
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4 min-w-[120px]">
                      Date
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4 min-w-[140px]">
                      Company Specific
                    </TableHead>
                    {!isEmployee && (
                      <TableHead className="font-semibold text-slate-700 py-4 text-right min-w-[100px]">
                        Actions
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {holidays.map((holiday, index) => (
                    <TableRow
                      key={holiday.id}
                      className="hover:bg-slate-50/50 transition-colors duration-150 group"
                    >
                      <TableCell className="py-4 font-medium text-slate-600">
                        {index + 1}
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CalendarDays className="w-4 h-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-slate-900 truncate">
                              {holiday.name}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-slate-700 font-medium">
                          {formatDate(holiday.date)}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            holiday.isCompanySpecific
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {holiday.isCompanySpecific
                            ? "Company Specific"
                            : "General"}
                        </span>
                      </TableCell>
                      {!isEmployee && (
                        <TableCell className="py-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(holiday.id)}
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </TableCell>
                      )}
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
                    <TableHead className="font-semibold text-slate-700 py-4 min-w-[200px]">
                      Name
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4 min-w-[120px]">
                      Date
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 py-4 min-w-[140px]">
                      Type
                    </TableHead>
                    {!isEmployee && (
                      <TableHead className="font-semibold text-slate-700 py-4 text-right min-w-[80px]">
                        Actions
                      </TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {holidays.map((holiday, index) => (
                    <TableRow
                      key={holiday.id}
                      className="hover:bg-slate-50/50 transition-colors duration-150 group"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <CalendarDays className="w-4 h-4 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-slate-900 truncate">
                              {holiday.name}
                            </p>
                            <p className="text-slate-500 text-xs mt-1">
                              #{index + 1}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-slate-700 font-medium">
                          {formatDate(holiday.date)}
                        </span>
                      </TableCell>
                      <TableCell className="py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            holiday.isCompanySpecific
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {holiday.isCompanySpecific ? "Company" : "General"}
                        </span>
                      </TableCell>
                      {!isEmployee && (
                        <TableCell className="py-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(holiday.id)}
                            className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </TableCell>
                      )}
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
            {holidays.map((holiday, index) => (
              <Card key={holiday.id} className="p-4 w-full">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CalendarDays className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-slate-500 text-xs font-medium">
                          #{index + 1}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            holiday.isCompanySpecific
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {holiday.isCompanySpecific ? "Company" : "General"}
                        </span>
                      </div>
                      <h3 className="font-medium text-slate-900 text-sm leading-tight break-words mb-1">
                        {holiday.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <CalendarDays className="w-3 h-3 text-slate-400 flex-shrink-0" />
                        <span className="text-slate-600 text-xs">
                          {formatDate(holiday.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!isEmployee && (
                    <div className="flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(holiday.id)}
                        className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="flex justify-center pt-4 px-4">
            <div className="w-full max-w-md">
              <PaginationControls pagination={pagination} setPage={setPage} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HolidayTable;
