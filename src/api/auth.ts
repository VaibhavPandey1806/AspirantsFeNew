import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import type { LoginCredentials, RegisterData } from '../types/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const checkLoginStatus = () => api.get('/public/isLogin');
export const getUserDetails = () => api.get('/api/userDetails');
export const registerUser = (data: RegisterData) => api.post('/api/register', data);
export const getUserById = (id: string) => api.get(`/api/getUserDetails?id=${id}`);