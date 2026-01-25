import { useState, useEffect } from "react";

import api from "@/utils/axiosInstance";

export const useEmployeeComplaints = (initialPage = 1, limit = 10) => {
  const [complaints, setComplaints] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchComplaints = async (page = currentPage) => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/complaints/own", {
        params: { page, limit },
      });
       
                                    
      const data = res.data.data;

       await new Promise((resolve) => setTimeout(resolve, 500));
      setComplaints(data.records);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [currentPage]);

  return {
    complaints,
    totalPages,
    currentPage,
    loading,
    error,
    setCurrentPage,
    refetch: fetchComplaints,
  };
};