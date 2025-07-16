import { useState } from "react";
import api from "@/utils/axiosInstance";

export const useDepartmentOptions = () => {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  
  const fetchDepartments = async () => {
    try { 
      const res = await api.get('/department/');
      setDepartments(res.data.data.departments || []);
    } catch (err) {
      console.error('Failed to fetch departments', err);
    }
  };
  
  const fetchDesignations = async (departmentId) => {
    try {
      const res = await api.get(`/designation/?departmentId=${departmentId}`);
      setDesignations(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch designations', err);
    }
  };

  return {
    departments,
    designations,
    fetchDepartments,
    fetchDesignations,
  };
}