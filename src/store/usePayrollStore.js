import { create } from "zustand"
import api from "@/utils/axiosInstance"
import { toast } from "sonner"

export const usePayrollStore = create((set, get) => ({
  payrolls: [],
  isLoading: false,
  pagination: null,
  filters: {},
  selectedPayroll: null,
  isGenerateModalOpen: false,
  isUpdateModalOpen: false,

  // Fetch payrolls from API
  fetchPayrolls: async () => {
    set({ isLoading: true })
    try {
      const { filters } = get()
      const params = {
        page: filters.page || 1,
        limit: filters.limit || 10,
        ...(filters.month && { month: filters.month }),
        ...(filters.year && { year: filters.year }),
        ...(filters.employeeType && { employeeType: filters.employeeType }),
        ...(filters.departmentId && { departmentId: filters.departmentId }),
        ...(filters.search && { search: filters.search }),
      }

      console.log("[v0] Fetching payrolls with params:", params)
      const response = await api.get("/payroll/salaries", { params })
      console.log("[v0] Payroll response:", response.data)

      const responseData = response.data?.data || response.data || {}
      const salariesData = responseData.salaries || []
      const paginationData = responseData.pagination || null

      console.log("[v0] Extracted salaries:", salariesData)
      console.log("[v0] Extracted pagination:", paginationData)

      set({
        payrolls: salariesData,
        pagination: paginationData,
        isLoading: false,
      })
    } catch (error) {
      console.error("[v0] Error fetching payrolls:", error)
      console.error("[v0] Error response:", error.response?.data)
      toast.error(error.response?.data?.message || "Failed to fetch payrolls")
      set({ isLoading: false, payrolls: [] })
    }
  },

  // Generate payroll
  generatePayroll: async (data) => {
    set({ isLoading: true })
    try {
      console.log("[v0] Generating payroll with data:", data)
      const response = await api.post("/payroll/salaries/generate", data)
      console.log("[v0] Generate payroll response:", response.data)

      toast.success(response.data.message || "Payroll generated successfully")

      // Refresh the payroll list
      await get().fetchPayrolls()

      set({ isLoading: false, isGenerateModalOpen: false })
      return response.data
    } catch (error) {
      console.error("[v0] Error generating payroll:", error)
      console.error("[v0] Error response:", error.response?.data)
      const errorMessage = error.response?.data?.message || error.message || "Failed to generate payroll"
      toast.error(errorMessage)
      set({ isLoading: false })
      throw error
    }
  },

  // Update payroll
  updatePayroll: async (payMasterId, data) => {
    set({ isLoading: true })
    try {
      const response = await api.patch(`/payroll/salaries/${payMasterId}`, data)

      toast.success("Payroll updated successfully")

      // Refresh the payroll list
      await get().fetchPayrolls()

      set({
        isLoading: false,
        isUpdateModalOpen: false,
        selectedPayroll: null,
      })

      return response.data
    } catch (error) {
      console.error("Error updating payroll:", error)
      toast.error(error.response?.data?.message || "Failed to update payroll")
      set({ isLoading: false })
      throw error
    }
  },

  // Set filters
  setFilters: (filters) => {
    set({ filters })
  },

  // Modal controls
  onOpenGenerate: () => set({ isGenerateModalOpen: true }),
  onCloseGenerate: () => set({ isGenerateModalOpen: false }),

  onOpenUpdate: (payroll) =>
    set({
      selectedPayroll: payroll,
      isUpdateModalOpen: true,
    }),
  onCloseUpdate: () =>
    set({
      selectedPayroll: null,
      isUpdateModalOpen: false,
    }),
}))
