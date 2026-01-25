import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";

import { useleaveApplication } from "@/store/useLeaveApplicationStore";


export const useAllLeaveApplication = ({
  limit = 10,
  status, fromDate, toDate, employeeCode
} = {}) => {
  const rawPage = useleaveApplication((state) => state.page);
  const page = isNaN(rawPage) || !rawPage ? 1 : rawPage;

  const [leaveApplications, setLeaveApplications] = useState([]);
  const [pagination, setPagination] = useState({
    totalRecords: 0,
    totalPages: 0,
    currentPage: page,
  });
  const [loading, setLoading] = useState(false);

  const fetchLeaveApplications = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const res = await api.get("/leaveApplication/", {
        params: {
          page,
          limit,
          status, fromDate, toDate,
          employeeCode
        },
      });

      const { records, totalRecords, totalPages, currentPage } = res.data.data;

      setLeaveApplications(records || []);
      setPagination({
        totalRecords,
        totalPages,
        currentPage,
      });
    } catch (error) {
      console.error("Error fetching leave policies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveApplications();
  }, [page, limit,status,fromDate,toDate]);

  return {
    leaveApplications,
    pagination,
    loading,
    refetch: fetchLeaveApplications,
  };
};
