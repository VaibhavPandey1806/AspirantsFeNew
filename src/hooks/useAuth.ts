import { useState, useEffect, useCallback } from 'react';
import { checkLoginStatus, getUserDetails } from '../api';

interface UserData {
  name: string;
  email?: string;
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLoginStatus = useCallback(async () => {
    try {
      const { data: loginStatus } = await checkLoginStatus();
      setIsLoggedIn(loginStatus);
      
      if (loginStatus) {
        const { data: userDetails } = await getUserDetails();
        setUserData(userDetails);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      setIsLoggedIn(false);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      if (isMounted) {
        await fetchLoginStatus();
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [fetchLoginStatus]);

  return {
    isLoggedIn,
    userData,
    isLoading,
    setIsLoggedIn,
    setUserData,
    refreshLoginStatus: fetchLoginStatus
  };
}