import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import QuestionForm from './components/QuestionForm';
import QuestionBank from './pages/QuestionBank';
import QuestionList from './pages/QuestionList';
import QuestionDetail from './pages/QuestionDetail';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import Profile from './pages/Profile';
import { checkLoginStatus, getUserDetails } from './utils/api';
import { LOGOUTURL } from './utils/comstants';

interface UserData {
  name: string;
  email?: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchLoginStatus = async () => {
      try {
        const { data: loginStatus } = await checkLoginStatus();
        
        if (!isMounted) return;
        
        setIsLoggedIn(loginStatus);
        
        if (loginStatus) {
          const { data: userDetails } = await getUserDetails();
          if (isMounted) {
            setUserData(userDetails);
          }
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        if (isMounted) {
          setIsLoggedIn(false);
          setUserData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchLoginStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    window.location.href = LOGOUTURL;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          isLoggedIn={isLoggedIn} 
          userName={userData?.name} 
          onLogout={handleLogout}
        />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/submit-question" 
              element={
                isLoggedIn ? <QuestionForm /> : <Navigate to="/login" />
              } 
            />
            <Route path="/question-bank" element={<QuestionBank />} />
            <Route path="/questions" element={<QuestionList />} />
            <Route path="/questions/:id" element={<QuestionDetail />} />
            <Route path="/login" element={<AuthPage />} />
            <Route 
              path="/profile" 
              element={
                isLoggedIn ? <Profile /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}