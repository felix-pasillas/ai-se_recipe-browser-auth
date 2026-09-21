import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

import type { CurrentUser } from '../types';

type AuthContextValue = {
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: CurrentUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(token: string, user: CurrentUser) {
    localStorage.setItem('auth-token', token);
    setIsAuthenticated(true);
    setCurrentUser(user);
  }

  function logout() {
    localStorage.removeItem('auth-token');
    setIsAuthenticated(false);
    setCurrentUser(null);
  }

  const value = { currentUser, isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
