import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, ChevronDown, ClipboardList } from 'lucide-react';

interface UserDropdownProps {
  userName?: string;
  onLogout: () => void;
}

export default function UserDropdown({ userName, onLogout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white text-blue-900 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
      >
        <User className="w-5 h-5" />
        <span className="font-medium">{userName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
            onClick={() => setIsOpen(false)}
          >
            <User size={16} className="mr-2" />
            My Profile
          </Link>
          <Link
            to="/responses"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
            onClick={() => setIsOpen(false)}
          >
            <ClipboardList size={16} className="mr-2" />
            My Responses
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}