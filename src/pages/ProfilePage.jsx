import { DashboardLayout } from '@/components/dashboardComponents/DashboardLayout';
import MyProfileCard from '@/components/myProfile/MyProfileCard';
import { useAuthStore } from '@/store/useAuthStore';

import React from 'react'

const ProfilePage = () => {
     
    const user = useAuthStore((state) => state.user);
         

      const config = {
        appName: "EmpTrack",
        portalName: "Admin Portal",
        variant: "admin",
        user: {
          name: `${user.name}`,
          role: "System Administrator",
          id: `${user.id}`,
        },
        
      };
  return (
    <DashboardLayout
      config={config}
      minimalLayout
    >
      <div className="p-4 h-screen w-full bg-amber-50">
         <MyProfileCard /> 
      </div>
    </DashboardLayout>
  )
}

export default ProfilePage