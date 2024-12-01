import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../utils/api';
import { User } from '../types/user';
import Avatar from '../components/Avatar';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await getUserDetails();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Unable to load user profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center gap-6 mb-8">
          <Avatar name={user.name} size="lg" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            {user.email && (
              <p className="text-gray-600 mt-1">{user.email}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <p className="mt-1 text-lg text-gray-900">{user.username}</p>
              </div>
              
              {user.mobile && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700">Mobile</label>
                  <p className="mt-1 text-lg text-gray-900">{user.mobile}</p>
                </div>
              )}
              
              {user.email && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-indigo-50 p-6 rounded-lg text-center">
                <p className="text-2xl font-bold text-indigo-600">0</p>
                <p className="text-sm text-indigo-700 mt-1">Questions Submitted</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">0</p>
                <p className="text-sm text-green-700 mt-1">Questions Answered</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}