// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Set your backend's base URL
});

// Optional: Set up interceptors for adding tokens to requests if logged in
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Example of where token is stored
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
