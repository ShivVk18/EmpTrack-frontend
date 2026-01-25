import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import { useHolidayStore } from "@/store/useHolidayStore";

export const useHolidays = ({
  limit = 10,
  startDate,
  endDate,
  isCompanySpecific,
} = {}) => {
  const rawPage = useHolidayStore((state) => state.page);
const page = isNaN(rawPage) || !rawPage ? 1 : rawPage;
  const [holidays, setHolidays] = useState([]);
  const [pagination, setPagination] = useState({
    totalRecord: 0,
    totalPages: 0,
    currentPage: page,
  });
  const [loading, setLoading] = useState(false);

  const fetchHolidays = async () => {
    try {
      setLoading(true);
       
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const res = await api.get("/holiday", {
        params: { page: isNaN(page) || !page ? 1 : page , limit, startDate, endDate, isCompanySpecific },
      });

      const { totalRecord, records } = res.data.data;
       

      setHolidays(records || []);
      setPagination({
        totalRecord,
        totalPages: Math.ceil(totalRecord / limit),
        currentPage: page,
      });
    } catch (error) {
      console.error("Error fetching holidays", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, [page, limit, startDate, endDate, isCompanySpecific]);

  return {
    holidays,
    pagination,
    loading,
    refetch: fetchHolidays,
  };
};
