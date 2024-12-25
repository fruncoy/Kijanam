import React, { createContext, useContext, useState } from 'react';
import { AuthState, User } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    return {
      isAuthenticated: !!user,
      user: user ? JSON.parse(user) : null,
    };
  });

  const login = async (email: string, password: string, rememberMe = false) => {
    // Updated credentials
    if (email === 'admin@km.com' && password === 'admin') {
      const user: User = {
        id: '1',
        name: 'Admin User',
        email: 'admin@km.com',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      };
      
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(user));
      setAuth({ isAuthenticated: true, user });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: User) => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      role: 'admin',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FF8001&color=fff`,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));
    setAuth({ isAuthenticated: true, user: newUser });
  };

  const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setAuth({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};