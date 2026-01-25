import { useState, useEffect } from "react"

import api from "@/utils/axiosInstance"

export const useDepartments = ({ page = 1, limit = 10, includeStats = true } = {}) => {
  const [departments, setDepartments] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchDepartments = async () => {
    try {
      setLoading(true)

      await new Promise((resolve) => setTimeout(resolve, 500))

      console.log("[v0] Fetching departments with params:", { page, limit, includeStats })
      const res = await api.get("/department", {
        params: { page, limit, includeStats },
      })
      console.log("[v0] Departments response:", res.data)

      const responseData = res.data.data || res.data
      const deptList = responseData.departments || responseData || []
      const paginationData = responseData.pagination || null

      setDepartments(deptList)
      setPagination(paginationData)
    } catch (error) {
      console.error("[v0] Error fetching departments:", error)
      console.error("[v0] Error response:", error.response?.data)
      setDepartments([])
      setPagination(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [page, limit])

  return { departments, pagination, loading, fetchDepartments, refetch: fetchDepartments }
}
