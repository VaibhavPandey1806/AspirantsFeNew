import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import type { LoginCredentials, AuthResponse } from '../types/auth';

export const performLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    // Create form data
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await axios.post(
      `${API_BASE_URL}/perform-login`,
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)
        },
        withCredentials: true
      }
    );

    return {
      success: true
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed. Please check your credentials.'
    };
  }
};