/**
 * AuthContext
 * 사용자 인증 관련 상태 및 로직 관리
 */

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import { getItem, setItem, removeItem } from '../utils/storage';
import { authService } from '../services/auth.service';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = getItem<User>('user');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = async (email: string, _password: string) => {
    // TODO: 실제 서비스에서는 authService.login() 사용
    // const response = await authService.login({ email, password });
    // setUser(response.user);
    // setItem('user', response.user);
    // setItem('templify_auth_token', response.token);

    // Mock login for now
    const mockUser: User = {
      id: 'u1',
      name: '홍길동',
      email,
      avatar: 'https://i.pravatar.cc/150?img=30',
      role: 'buyer',
      level: 5,
      points: 1250,
      badges: [],
      purchasedTemplates: [],
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    setItem('user', mockUser);
  };

  const logout = () => {
    setUser(null);
    removeItem('user');
    authService.logout(); // 토큰 제거
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    setItem('user', updatedUser);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
