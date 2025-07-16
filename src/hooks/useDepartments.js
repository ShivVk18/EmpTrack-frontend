import { useState,useEffect } from "react";

import api from "@/utils/axiosInstance";


export const useDepartments = ({page=1,limit=10,includeStats=true} = {}) => {
     const [departments,setDepartments] = useState([])
     const [pagination,setPagination] = useState(null)
     const  [loading,setLoading] = useState(false)

     const fetchDepartments = async() => {
        try {
            setLoading(true)
            
            await new Promise((resolve) => setTimeout(resolve, 500));

            const res = await api.get("/department",{
                 params: {page,limit,includeStats}
            })
             
          
            const {departments,pagination} = res.data.data; 
            setDepartments(departments || [])
            setPagination(pagination || null)
        } catch (error) {
             console.error("Error fetching departments",error)
        }finally{
            setLoading(false)
        }
     }


     useEffect(()=> {
        fetchDepartments()
     },[page,limit])


     return {departments,pagination,loading,refetch:fetchDepartments}
 }

