import axios from 'axios';

const API_BASE_URL = 'https://nutrition-tracking-app-frontend.onrender.com';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // User onboarding
  async onboardUser(data) {
    const response = await axiosInstance.post('/api/user/onboard', data);
    return response.data;
  },

  // Food log
  async getFoodLog(userId) {
    const response = await axiosInstance.get(`/api/food-log/log/${userId}`);
    return response.data;
  },

  async updateFoodLog(data) {
    const response = await axiosInstance.put('/api/food-log/log', data);
    return response.data;
  },

  // Reminders
  async addReminder(data) {
    const response = await axiosInstance.post('/reminders/reminders', data);
    return response.data;
  },

  async getReminders(userId) {
    const response = await axiosInstance.get('/reminders/reminders', {
      params: { user_id: userId },
    });
    return response.data;
  },

  async deleteReminder(id) {
    const response = await axiosInstance.delete(`/reminders/reminders/${id}`);
    return response.data;
  },

async getFoods() {
  const response = await axiosInstance.get('/api/foods');
  return response.data;
}
};
