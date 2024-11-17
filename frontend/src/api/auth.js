// frontend/src/api/auth.js
// frontend/src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const register = async (email, password, name, userid) => {
  return await axios.post(`${API_URL}/auth/register`, { email, password, name, userid });
};

export const login = async (email, password) => {
  return await axios.post(`${API_URL}/auth/login`, { email, password });
};

export const forgotpassword = async (email, message) => {
  return await axios.post(`${API_URL}/auth/forgotpassword`, { email, message });
};

export const resetpassword = async (email, message) => {
  return await axios.post(`${API_URL}/auth/resetpassword`, { newPassword, confirmPassword, message});
};



