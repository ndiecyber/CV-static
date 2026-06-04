import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const decodeJwtPayload = (token: string) => {
  const [, payload] = token.split('.');
  if (!payload) return null;
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
  try {
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
};

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  const payload = decodeJwtPayload(token);
  if (!payload) return false;
  if (typeof payload.exp !== 'number') return true;
  return Date.now() < payload.exp * 1000;
};

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => {
    const stored = localStorage.getItem('_pk');
    return isTokenValid(stored) ? stored : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('_pk');
    if (!isTokenValid(storedToken)) {
      localStorage.removeItem('_pk');
      if (token !== null) setToken(null);
      return;
    }
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('_pk', newToken);
    setToken(newToken);
    navigate('/randi/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('_pk');
    setToken(null);
    navigate('/randi');
  };

  return { token, isAuthenticated: !!token, login, logout };
}
