import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

export default function PrivateRoute({ isLoggedIn, children }: PrivateRouteProps) {
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}