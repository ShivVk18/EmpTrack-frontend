import axios from "axios";

import { useAuthStore } from "@/store/useAuthStore";

export const refreshAccessToken = async () => {
  try {
    const res = await axios.post(
      "/api/v1/auth/refresh-token",
      {},
      { withCredentials: true }
    );

    const { accessToken, refreshToken, user, userType } = res.data.data;

    useAuthStore.getState().setUser({
      user,
      userType,
      token: accessToken,
    });

    localStorage.setItem("token", accessToken);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    useAuthStore.getState().logout();
    throw error;
  }
};
