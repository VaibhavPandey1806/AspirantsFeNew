import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { performLogin, checkLoginStatus, getUserDetails } from '../api/auth';
import type { LoginCredentials } from '../types/auth';

export function useAuth() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });

  const checkAuth = useCallback(async () => {
    try {
      const isAuthenticated = await checkLoginStatus();
      setIsLoggedIn(isAuthenticated);
      
      if (isAuthenticated) {
        const userDetails = await getUserDetails();
        setUserData(userDetails);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsLoggedIn(false);
      setUserData(null);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await performLogin(credentials);
      
      if (response.success) {
        // Redirect will be handled by Spring Security
        window.location.href = '/';
      } else {
        setError(response.message);
      }
    } catch (error: any) {
      setError('An unexpected error occurred');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return {
    isLoggedIn,
    userData,
    isLoading,
    error,
    credentials,
    handleSubmit,
    handleInputChange,
    checkAuth
  };
}