import { useState } from "react";
import axios from "axios";
import api from "@/utils/axiosInstance";
import { toast } from "sonner";

export const useFormSubmit = () => {
  const [loading, setLoading] = useState(false);

  const submitForm = async ({
    data,
    endpoint,
    method = "post", 
    isMultipart = false,
    onSuccess = () => {},
    onError = () => {},
    resetForm = () => {},
    auth = true, 
  }) => {
    try {
      setLoading(true);

      const payload = isMultipart ? new FormData() : data;

      if (isMultipart) {
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            payload.append(key, value);
          }
        });
      }

      const headers = {
        ...(isMultipart && { "Content-Type": "multipart/form-data" }),
      };

      const client = auth ? api : axios;

      const res =
        method === "patch"
          ? await client.patch(endpoint, payload, { headers })
          : await client.post(endpoint, payload, { headers });

      if (res.data?.success || res.status === 200 || res.status === 201) {
        toast.success(res.data?.message || "Submitted successfully");
        resetForm();
        onSuccess(res.data);
      } else {
        toast.error("Something went wrong");
        onError(res);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      toast.error(err?.response?.data?.message || "Submission error");
      onError(err);
    } finally {
      setLoading(false);
    }
  };

  return { submitForm, loading };
};
