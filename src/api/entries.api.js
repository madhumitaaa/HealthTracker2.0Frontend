import axiosInstance from './axios';

export const entriesAPI = {
  // Get last 30 entries
  getAll: async () => {
    try {
      const res = await axiosInstance.get('/entries');
      return res.data;
    } catch (err) {
      console.error('Get Entries Error:', err);
      throw err.response?.data || { message: 'Failed to fetch entries' };
    }
  },

  // Get dashboard summary
  getDashboardSummary: async () => {
    try {
      const res = await axiosInstance.get('/entries/dashboard/summary');
      return res.data;
    } catch (err) {
      console.error('Dashboard Summary Error:', err);
      throw err.response?.data || { message: 'Failed to fetch summary' };
    }
  },

  // Get single entry
  getById: async (id) => {
    try {
      const res = await axiosInstance.get(`/entries/${id}`);
      return res.data;
    } catch (err) {
      console.error('Get Entry Error:', err);
      throw err.response?.data || { message: 'Failed to fetch entry' };
    }
  },

  // Create entry
  create: async (data) => {
    try {
      const res = await axiosInstance.post('/entries', data);
      console.log('Create Entry Response:', res.data); // debug
      return res.data;
    } catch (err) {
      console.error('Create Entry Error:', err);
      throw err.response?.data || { message: 'Failed to create entry' };
    }
  },

  // Update entry
  update: async (id, data) => {
    try {
      const res = await axiosInstance.put(`/entries/${id}`, data);
      console.log('Update Entry Response:', res.data); // debug
      return res.data;
    } catch (err) {
      console.error('Update Entry Error:', err);
      throw err.response?.data || { message: 'Failed to update entry' };
    }
  },

  // Delete entry
  delete: async (id) => {
    try {
      const res = await axiosInstance.delete(`/entries/${id}`);
      return res.data;
    } catch (err) {
      console.error('Delete Entry Error:', err);
      throw err.response?.data || { message: 'Failed to delete entry' };
    }
  }
};