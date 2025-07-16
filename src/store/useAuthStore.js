import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ROLE_PERMISSIONS } from "../../constants/rolePermissions";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      userType: null,
      token: null,

      setUser: ({ user, token, userType }) => {
      if (!user || !userType || !token) {
    return get().logout();
  }

  
  const isEmployee = userType === 'employee';
  if (isEmployee && !user.role) {
    return get().logout();
  }
        
        set({
          user,
          role: user.role,
          userType,
          token,
        });
      },

      logout: () => {
        set({
          user: null,
          role: null,
          userType: null,
          token: null,
        });

        localStorage.removeItem('emptrack-auth') 
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('userType')
      },

      hasPermission: (permission) => {
        const { role, userType } = get();

        if (!role || !userType) {
          get().logout();
          return false;
        }

        if (userType === "admin") return true;

        const permissions = ROLE_PERMISSIONS[role] || [];

        if (permissions.includes("*")) return true;
        if (permissions.includes(permission)) return true;

        const [resource] = permission.split(":");
        if (permissions.includes(`${resource}:manage`)) return true;

        return false;
      },
    }),

    {
      name: "emptrack-auth",
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        userType: state.userType,
        token: state.token,
      }),
    }
  )
);
