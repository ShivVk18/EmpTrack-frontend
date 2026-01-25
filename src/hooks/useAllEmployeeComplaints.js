import { useEffect, useState, useCallback } from "react";
import api from "@/utils/axiosInstance";
import { useComplaintsStore } from "@/store/useComplaintsStore";

export const useAllEmployeeComplaints = ({
  limit = 10,
  employeeName = "",
  status = "",
} = {}) => {
  const rawPage = useComplaintsStore((state) => state.page);
  const page = isNaN(rawPage) || !rawPage ? 1 : rawPage;

  const setPage = useComplaintsStore((state) => state.setPage);
  const [complaints, setComplaints] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: page,
    totalPages: 1,
    totalRecords: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/complaints/", {
        params: {
          page,
          limit,
          employeeName: employeeName || undefined,
          status: status || undefined,
        },
      });

      const data = res.data.data;

      setComplaints(data.records || []);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        totalRecords: data.totalRecords,
      });
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setError(err?.response?.data?.message || "Failed to load complaints");
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, employeeName, status]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  useEffect(() => {
    useComplaintsStore.getState().setRefetch(fetchComplaints);
  }, [fetchComplaints]);

  return {
    complaints,
    pagination,
    loading,
    error,
    setPage,
    refetch: fetchComplaints,
  };
};
