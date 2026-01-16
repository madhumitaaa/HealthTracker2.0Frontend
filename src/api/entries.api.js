import axiosInstance from './axios';

export const entriesAPI = {
  getDashboardSummary: () => axiosInstance.get('/entries/dashboard/summary'),
  getAll: () => axiosInstance.get('/entries'),
  create: (data) => axiosInstance.post('/entries', data),
  update: (id, data) => axiosInstance.put(`/entries/${id}`, data),
  delete: (id) => axiosInstance.delete(`/entries/${id}`),
};
