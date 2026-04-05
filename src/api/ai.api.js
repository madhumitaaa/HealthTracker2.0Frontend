import axiosInstance from './axios';

export const aiAPI = {
  chat: async (message) => {
    try {
      const res = await axiosInstance.post('/ai/chat', { message });
      return res.data;
    } catch (err) {
      console.error('AI Chat Error:', err);
      throw err.response?.data || { message: 'AI chat failed' };
    }
  },

  getJobStatus: async (jobId) => {
    try {
      const res = await axiosInstance.get(`/ai/job-status/${jobId}`);
      return res.data;
    } catch (err) {
      console.error('Job Status Error:', err);
      throw err.response?.data || { message: 'Failed to get job status' };
    }
  },

   generateWeeklyReport: async () => {
    try {
      const res = await axiosInstance.post('/ai/weekly-report');
      return res.data;
    } catch (err) {
      console.error('Weekly Report Error:', err);
      throw err.response?.data || { message: 'Weekly report failed' };
    }
  },

getDailyRoutine: async () => {
  try {
    const res = await axiosInstance.post('/ai/daily-routine'); // ✅ POST (correct)

    console.log("Daily Routine API:", res.data);

    return res; // return full response
  } catch (err) {
    console.error("API ERROR:", err.response || err);
    throw err.response?.data || { message: 'Daily routine failed' };
  }
},

  getNightReview: async () => {
    try {
      const res = await axiosInstance.get('/ai/night-review');
      console.log('Night Review API:', res.data);
      return res.data;
    } catch (err) {
      console.error('Night Review Error:', err);
      throw err.response?.data || { message: 'Failed to fetch night review' };
    }
  }
};