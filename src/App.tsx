import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import { useAuth } from './hooks/useAuth';
import { LOGOUT_URL } from './utils/constants';

export default function App() {
  const { isLoggedIn, userData, isLoading } = useAuth();

  const handleLogout = () => {
    window.location.href = LOGOUT_URL;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        isLoggedIn={isLoggedIn} 
        userName={userData?.name} 
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        <AppRoutes isLoggedIn={isLoggedIn} />
      </main>
      <Footer />
    </div>
  );
}