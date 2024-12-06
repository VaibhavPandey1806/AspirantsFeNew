import { useState, useEffect } from 'react';
import { LoginCredentials } from '../types/auth';
import { checkLoginStatus } from '../utils/api';
import { performLogin } from '../utils/auth';
import { ROUTES } from '../config/metadata';

export function useAuth() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: isLoggedIn } = await checkLoginStatus();
        if (isLoggedIn) {
          window.location.href = ROUTES.HOME;
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await performLogin(credentials);
      
      if (response.success) {
        const { data: isLoggedIn } = await checkLoginStatus();
        
        if (isLoggedIn) {
          window.location.href = ROUTES.HOME;
        } else {
          setError('Login verification failed. Please try again.');
        }
      } else {
        setError(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return {
    credentials,
    error,
    isLoading,
    handleSubmit,
    handleInputChange
  };
}