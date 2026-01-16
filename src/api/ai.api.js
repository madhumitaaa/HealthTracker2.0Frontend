import axiosInstance from './axios';

export const aiAPI = {
  chat: (message) => axiosInstance.post('/ai/chat', { message }),
  generateWeeklyReport: () => axiosInstance.post('/ai/weekly-report', {}),
};
