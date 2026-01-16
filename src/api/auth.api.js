import axiosInstance from './axios';

export const authAPI = {
  register: (data) => axiosInstance.post('/auth/register', data),
  login: (data) => axiosInstance.post('/auth/login', data),
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};
