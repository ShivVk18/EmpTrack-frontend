import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import Spinner from "../ui/Spinner"
import { Card } from "../ui/card"
import { toast } from "sonner"
import { Trash2, Calendar, Pencil, Clock, CheckCircle, XCircle } from "lucide-react"
import api from "@/utils/axiosInstance"
import { PaginationControls } from "../departmentDesignationComponents/PaginationControls"
import { useEffect, useState } from "react"
import { useAttendancePlanStore } from "@/store/useAttendancePlanStore"
import { useAttendancePlans } from "@/hooks/useAttendancePlan"


const AttendancePlanTable = () => {
  const { attendancePlans, pagination, loading, refetch } = useAttendancePlans()
  const { setPage, onOpen } = useAttendancePlanStore()
  const shouldRefetchAfterAdd = useAttendancePlanStore((state) => state.shouldRefetchAfterAdd)
  const setShouldRefetchAfterAdd = useAttendancePlanStore((state) => state.setShouldRefetchAfterAdd)

  const [deletingId, setDeletingId] = useState(null)
  const [isRefetching, setIsRefetching] = useState(false)

  const formatTime = (timeString) => {
    if (!timeString) return "N/A"
    try {
      const [hours, minutes] = timeString.split(":")
      const hour12 = Number.parseInt(hours) > 12 ? Number.parseInt(hours) - 12 : Number.parseInt(hours)
      const ampm = Number.parseInt(hours) >= 12 ? "PM" : "AM"
      return `${hour12 === 0 ? 12 : hour12}:${minutes} ${ampm}`
    } catch {
      return timeString
    }
  }

  const handleDelete = async (id) => {
    if (deletingId) return
    setDeletingId(id)
    console.log("Starting delete for ID:", id)

    try {
      await api.delete(`/attendancePlan/${id}`)
      console.log("Delete successful, calling refetch...")
      toast.success("Attendance plan deleted successfully!")

      // Show refetch loading
      setIsRefetching(true)

      // Calculate next page if current page becomes empty
      const nextPage =
        attendancePlans.length === 1 && pagination.currentPage > 1 ? pagination.currentPage - 1 : pagination.currentPage

      // Set the page first if needed
      if (nextPage !== pagination.currentPage) {
        console.log("Changing page from", pagination.currentPage, "to", nextPage)
        setPage(nextPage)
        // Wait a bit for the page to update in the store
        setTimeout(async () => {
          await refetch()
          setIsRefetching(false)
        }, 100)
      } else {
        // Same page, just refetch
        await refetch()
        setIsRefetching(false)
      }
    } catch (err) {
      console.error("Delete error:", err)
      toast.error("Failed to delete attendance plan.")
      setIsRefetching(false)
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = (plan) => {
    onOpen(plan.id)
  }

  // Handle refetch after add
  useEffect(() => {
    if (shouldRefetchAfterAdd) {
      console.log("Refetching due to shouldRefetchAfterAdd")
      setIsRefetching(true)
      refetch().finally(() => {
        setIsRefetching(false)
        setShouldRefetchAfterAdd(false)
      })
    }
  }, [shouldRefetchAfterAdd, refetch, setShouldRefetchAfterAdd])

  if (loading || isRefetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <Spinner size="48px" />
          <p className="text-slate-500 text-sm">
            {isRefetching ? "Updating attendance plans..." : "Loading attendance plans..."}
          </p>
        </div>
      </div>
    )
  }

  if (attendancePlans.length === 0) {
    return (
      <Card className="p-6 sm:p-10 text-center border-dashed border-2 border-slate-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">No Attendance Plans Found</h3>
            <p className="text-slate-500 text-sm max-w-md">
              Create attendance plans to manage working hours, shifts, and attendance policies for your organization.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="w-full space-y-6">
      <Card className="overflow-hidden border-0 shadow ring-1 ring-slate-200">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 text-slate-700">
                <TableHead className="w-16">S.No</TableHead>
                <TableHead className="min-w-48">Plan Name</TableHead>
                <TableHead className="min-w-32">Description</TableHead>
                <TableHead className="w-28 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4" />
                    Hours
                  </div>
                </TableHead>
                <TableHead className="w-32 text-center">Shift Start</TableHead>
                <TableHead className="w-28 text-center">Late Allowed</TableHead>
                <TableHead className="w-28 text-center">Grace Period</TableHead>
                <TableHead className="w-24 text-center">Early Leave</TableHead>
                <TableHead className="w-24 text-center">Punch Out</TableHead>
                <TableHead className="w-24 text-center">Default</TableHead>
                <TableHead className="w-32 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendancePlans.map((plan, index) => (
                <TableRow key={plan.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium text-slate-600">
                    {(pagination.currentPage - 1) * 10 + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell className="text-slate-600 max-w-xs truncate">
                    {plan.description || "No description"}
                  </TableCell>
                  <TableCell className="text-center font-medium">{plan.workingHours} hrs</TableCell>
                  <TableCell className="text-center">{formatTime(plan.shiftStartTime)}</TableCell>
                  <TableCell className="text-center">{plan.allowedLateMins || 0} mins</TableCell>
                  <TableCell className="text-center">{plan.gracePeriodMins || 0} mins</TableCell>
                  <TableCell className="text-center">
                    {plan.allowEarlyLeave ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {plan.requirePunchOut ? (
                      <CheckCircle className="w-4 h-4 text-green-600 mx-auto" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500 mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {plan.isDefault ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Default
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(plan)}
                        className="h-8 px-3 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600"
                        disabled={!!deletingId || isRefetching}
                      >
                        <Pencil className="w-4 h-4" />
                        <span className="ml-1 hidden xl:inline">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(plan.id)}
                        className="h-8 px-3 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                        disabled={!!deletingId || isRefetching}
                      >
                        {deletingId === plan.id ? <Spinner size="16px" /> : <Trash2 className="w-4 h-4" />}
                        <span className="ml-1 hidden xl:inline">
                          {deletingId === plan.id ? "Deleting..." : "Delete"}
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
  )
}

export default AttendancePlanTable
