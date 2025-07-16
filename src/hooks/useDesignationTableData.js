import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";

export const useDesignationTableData = (departmentId) => {
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 }); // ✅ local pagination

  const fetchDesignations = async (page = pagination.page) => {
    try {
      setLoading(true);
      const res = await api.get(`/designation`, {
        params: {
          departmentId,
          page,
        },
      });

      setDesignations(res.data.data.designations);
      setPagination(res.data.data.pagination); 
    } catch (err) {
      console.error("Error fetching designations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (departmentId) {
      fetchDesignations(pagination.page);
    }
  }, [departmentId, pagination.page]); 

  const setPage = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  return { designations, loading, fetchDesignations, pagination, setPage };
};