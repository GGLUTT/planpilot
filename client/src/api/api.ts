import axios from 'axios';

// Використовуємо локальну адресу - проксі перенаправить запити
const BASE_URL = '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const getUser = async (userId: string) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateUser = async (userId: string, userData: { username?: string; photoUrl?: string }) => {
  const response = await api.put(`/users/${userId}`, userData);
  return response.data;
};

// Goals API
export const getGoals = async (userId: string) => {
  const response = await api.get(`/goals/user/${userId}`);
  return response.data;
};

export const getGoal = async (goalId: string) => {
  const response = await api.get(`/goals/${goalId}`);
  return response.data;
};

export const createGoal = async (goalData: {
  userId: string;
  title: string;
  description?: string;
  deadline?: Date;
  priority?: 'low' | 'medium' | 'high';
  tasks?: { title: string }[];
}) => {
  const response = await api.post('/goals', goalData);
  return response.data;
};

export const updateGoal = async (goalId: string, goalData: {
  title?: string;
  description?: string;
  deadline?: Date;
  status?: 'pending' | 'in-progress' | 'completed' | 'canceled';
  priority?: 'low' | 'medium' | 'high';
  tasks?: { title: string; completed: boolean }[];
}) => {
  const response = await api.put(`/goals/${goalId}`, goalData);
  return response.data;
};

export const deleteGoal = async (goalId: string) => {
  const response = await api.delete(`/goals/${goalId}`);
  return response.data;
};

// Tasks API
export const addTask = async (goalId: string, title: string) => {
  const response = await api.post(`/goals/${goalId}/tasks`, { title });
  return response.data;
};

export const updateTask = async (goalId: string, taskId: string, taskData: { title?: string; completed?: boolean }) => {
  const response = await api.put(`/goals/${goalId}/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (goalId: string, taskId: string) => {
  const response = await api.delete(`/goals/${goalId}/tasks/${taskId}`);
  return response.data;
};

export default api; 