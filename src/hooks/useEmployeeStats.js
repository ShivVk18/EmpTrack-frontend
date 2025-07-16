import { useAuthStore } from "@/store/useAuthStore";
import api from "@/utils/axiosInstance";
import { useState, useEffect } from "react";

export const useEmployeeStats = () => {
    const [stats,setStats] = useState(null)
    const [loading,setLoading] = useState(true)
    const token = useAuthStore((state) => state.token);
    const fetchStats = async() => {
         try {
             const res = await api.get('/employee/stats',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
             })

             if(res.data.success){
                 setStats(res.data.data)
             }


         } catch (error) {
            console.error("Failed to fetch stats:",error)
         }finally{
            setTimeout(() => setLoading(false), 500);
         }
    }


    useEffect(()=> {
        fetchStats()
    },[])

    return {stats,loading}
}  

