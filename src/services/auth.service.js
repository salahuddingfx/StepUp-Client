import api from './api';

export const login = async (email, password) => {
  return await api.post('/auth/login', { email, password });
};

export const register = async (userData) => {
  return await api.post('/auth/register', userData);
};

export const verifyEmail = async (email, code) => {
  return await api.post('/auth/verify-email', { email, code });
};

export const resendOTP = async (email) => {
  return await api.post('/auth/resend-otp', { email });
};

export const forgotPassword = async (email) => {
  return await api.post('/auth/forgot-password', { email });
};

export const resetPassword = async (email, code, newPassword) => {
  return await api.post('/auth/reset-password', { email, code, newPassword });
};

export const logout = async () => {
  return await api.post('/auth/logout');
};
