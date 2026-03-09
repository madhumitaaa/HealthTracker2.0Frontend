// src/api/entries.api.js
import axiosInstance from './axios';

export const entriesAPI = {
  // Get last 30 entries
  getAll: () => axiosInstance.get('/entries'),

  // Get dashboard summary
  getDashboardSummary: () => axiosInstance.get('/entries/dashboard/summary'),

  // Get single entry by id
  getById: (id) => axiosInstance.get(`/entries/${id}`),

  // Create entry
  create: (data) => axiosInstance.post('/entries', data),

  // Update entry
  update: (id, data) => axiosInstance.put(`/entries/${id}`, data),

  // Delete entry
  delete: (id) => axiosInstance.delete(`/entries/${id}`)
};