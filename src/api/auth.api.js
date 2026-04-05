import axiosInstance from './axios';

export const authAPI = {
  login: async (data) => {
    const res = await axiosInstance.post('/auth/login', data);

    console.log("🔥 BACKEND RESPONSE:", res.data);

    const payload = res?.data?.data;

    if (!payload) {
      throw new Error('Invalid response format from server');
    }

    const accessToken = payload.accessToken || payload.token;
    const refreshToken = payload.refreshToken || null;

    const user = {
      id: payload.userId,
      email: data.email,
      profile: payload.profile || {}
    };

    if (!accessToken) {
      throw new Error('Login failed: No access token');
    }

    return {
      accessToken,
      refreshToken,
      user,
    };
  },

  register: async (data) => {
    const res = await axiosInstance.post('/auth/register', data);

    const payload = res?.data?.data;

    if (!payload) {
      throw new Error('Invalid response format');
    }

    return {
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      user: {
        id: payload.userId,
        email: data.email,
        profile: payload.profile || {}
      }
    };
  },
};