import { useEffect, useState, useCallback } from "react"
import api from "@/utils/axiosInstance"
import { usePayParameterStore } from "@/store/usePayParameterStore"

export const usePayParameters = ({ limit = 10, employeeType } = {}) => {
  const rawPage = usePayParameterStore((state) => state.page)
  const page = isNaN(rawPage) || !rawPage ? 1 : rawPage

  const [payParameters, setPayParameters] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: page,
    totalPages: 0,
    totalCount: 0,
    hasNext: false,
    hasPrev: false,
  })
  const [loading, setLoading] = useState(false)

 
  const fetchPayParameters = useCallback(async () => {
    try {
      setLoading(true)
      console.log("Fetching pay parameters with params:", {
        page,
        limit,
        employeeType,
        
      })

      
      const res = await api.get("payroll/parameters", {
        params: {
          page,
          limit,
          employeeType,

        },
      })

      console.log("API Response:", res.data)

      const { payParameters: data, pagination: pg } = res.data.data

      setPayParameters(data || [])

      if (pg) {
        setPagination({
          currentPage: pg.currentPage,
          totalPages: pg.totalPages,
          totalCount: pg.totalCount,
          hasNext: pg.hasNext,
          hasPrev: pg.hasPrev,
        })
      }

      console.log("Updated payParameters:", data)
    } catch (error) {
      console.error("Error fetching pay parameters:", error)
   
      setPayParameters([])
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
  }, [page, limit, employeeType]) 

  
  useEffect(() => {
    fetchPayParameters()
  }, [fetchPayParameters]) 

  return {
    payParameters,
    pagination,
    loading,
    refetch: fetchPayParameters, 
  }
}