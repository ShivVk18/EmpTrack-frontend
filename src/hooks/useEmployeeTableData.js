import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";

export const useEmployeesTableData = (filters = {}) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const fetchEmployees = async (page = pagination.page) => {
    try {
      setLoading(true);
      const res = await api.get(`/employee`, {
        params: {
          ...filters,
          page,
        },
      });

      setEmployees(res.data.data.employees);
      setPagination(res.data.data.pagination);
    } catch (err) {
      console.error("Error fetching employees", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(pagination.page);
  }, [JSON.stringify(filters), pagination.page]);

  const setPage = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  return {
    employees,
    loading,
    fetchEmployees,
    pagination,
    setPage,
  };
};