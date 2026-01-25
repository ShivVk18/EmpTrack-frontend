import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import { useleavePolicy } from "@/store/useLeavePolicy";


export const useLeavePolicies = ({
  limit = 10,
  leaveType,
  isPaid,
  isActive,
} = {}) => {
  const rawPage = useleavePolicy((state) => state.page);
  const page = isNaN(rawPage) || !rawPage ? 1 : rawPage;

  const [leavePolicies, setLeavePolicies] = useState([]);
  const [pagination, setPagination] = useState({
    totalRecords: 0,
    totalPages: 0,
    currentPage: page,
  });
  const [loading, setLoading] = useState(false);

  const fetchLeavePolicies = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const res = await api.get("/leavePolicy", {
        params: {
          page,
          limit,
          leaveType,
          isPaid,
          isActive,
        },
      });

      const { records, totalRecords, totalPages, currentPage } = res.data.data;

      setLeavePolicies(records || []);
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
    fetchLeavePolicies();
  }, [page, limit, leaveType, isPaid, isActive]);

  return {
    leavePolicies,
    pagination,
    loading,
    refetch: fetchLeavePolicies,
  };
};
