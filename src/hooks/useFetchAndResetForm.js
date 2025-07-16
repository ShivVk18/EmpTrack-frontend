import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import { toast } from "sonner";

export const useFetchAndResetForm = ({
  id,
  endpoint,
  form,
  mapResponse = (res) => res,
  enabled = true,
}) => {
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false); // ✅ ADD THIS

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (!id || !enabled || fetched) return; // ✅ prevent repeated fetch

      try {
        setLoading(true);
        const res = await api.get(`${endpoint}/${id}`);
        const mapped = mapResponse(res.data.data);
        if (isMounted) {
          form.reset(mapped);
          setFetched(true); // ✅ avoid future fetches
        }
      } catch (error) {
        if (isMounted) {
          console.error("Fetch error:", error);
          toast.error(error?.response?.data?.message || "Failed to fetch data");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [id, endpoint, mapResponse, enabled, form, fetched]);

  return { loading };
};
