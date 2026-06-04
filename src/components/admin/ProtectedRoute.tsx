import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/randi" replace />;
  }

  return <>{children}</>;
}
