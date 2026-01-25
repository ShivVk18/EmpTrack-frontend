import { useEffect, useState, useCallback } from "react"
import api from "@/utils/axiosInstance"
import { useAttendancePlanStore } from "@/store/useAttendancePlanStore"

export const useAttendancePlans = ({ limit = 10 } = {}) => {
  const rawPage = useAttendancePlanStore((state) => state.page)
  const page = isNaN(rawPage) || !rawPage ? 1 : rawPage

  const [attendancePlans, setAttendancePlans] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: page,
    totalPages: 0,
    totalCount: 0,
    hasNext: false,
    hasPrev: false,
  })
  const [loading, setLoading] = useState(false)

  const fetchAttendancePlans = useCallback(async () => {
    try {
      setLoading(true)
      console.log("Fetching attendance plans with params:", {
        page,
        limit,
      })

      const res = await api.get("/attendancePlan", {
        params: {
          page,
          limit,
        },
      })

      console.log("API Response:", res.data)
      const { records: data, totalPages, totalRecords, currentPage } = res.data.data

      setAttendancePlans(data || [])

      const hasNext = currentPage < totalPages
      const hasPrev = currentPage > 1

      setPagination({
        currentPage,
        totalPages,
        totalCount: totalRecords,
        hasNext,
        hasPrev,
      })

      console.log("Updated attendancePlans:", data)
    } catch (error) {
      console.error("Error fetching attendance plans:", error)

      setAttendancePlans([])
      setPagination({
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        hasNext: false,
        hasPrev: false,
      })
    } finally {
      setLoading(false)
    }
  }, [page, limit])

  useEffect(() => {
    fetchAttendancePlans()
  }, [fetchAttendancePlans])

  return {
    attendancePlans,
    pagination,
    loading,
    refetch: fetchAttendancePlans,
  }
}
