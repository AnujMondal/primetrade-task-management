import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Get all tasks
export const getTasks = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.priority) params.append("priority", filters.priority);
    if (filters.search) params.append("search", filters.search);
    if (filters.sort) params.append("sort", filters.sort);

    const response = await axios.get(`${API_URL}/tasks?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get single task
export const getTask = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Create task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update task
export const updateTask = async (id, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete task
export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get task statistics
export const getTaskStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks/stats`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
