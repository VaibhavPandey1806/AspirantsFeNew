import React from 'react';
import { Link } from 'react-router-dom';
import UserDropdown from './UserDropdown';
import { LOGIN_URL } from '../../utils/constants';

interface AuthButtonsProps {
  isLoggedIn: boolean;
  userName?: string;
  isAdmin?: boolean;
  onLogout: () => void;
  className?: string;
}

export default function AuthButtons({ 
  isLoggedIn, 
  userName, 
  isAdmin,
  onLogout, 
  className = '' 
}: AuthButtonsProps) {
  const handleLogin = () => {
    window.location.href = LOGIN_URL;
  };

  return (
    <div className={`items-center gap-4 ${className}`}>
      {isLoggedIn ? (
        <UserDropdown 
          userName={userName || ''} 
          isAdmin={isAdmin}
          onLogout={onLogout} 
        />
      ) : (
        <button
          onClick={handleLogin}
          className="bg-white text-blue-900 px-6 py-2 rounded-full hover:bg-blue-50 transition-colors font-medium"
        >
          LOGIN
        </button>
      )}
    </div>
  );
}