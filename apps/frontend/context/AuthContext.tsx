'use client';

/* ═══════════════════════════════════════════
 * File: context/AuthContext.tsx
 * Purpose: Provides a global React Context for authentication state management.
 * Design Decisions:
 * - Exposes high-level methods (login, register, logout, fetchUser) that interact with the Next.js API routes.
 * - Manages an `isLoading` state to defer rendering of protected content until session validation completes.
 * Tokens Used: N/A (State layer only)
 * Component Connections:
 * - Wraps the entire application in layout.tsx.
 * - Consumed via `useAuth()` hook throughout the app.
 * ═══════════════════════════════════════════ */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // isLoading = true while we check for an existing session on mount
  const [isLoading, setIsLoading] = useState(true);

  // ══════════════════════════════════════════════════════════════════════════
  // BACKEND DEVELOPER INTEGRATION CORNER:
  // To connect this frontend with your real separate backend (e.g. running on port 3001 or staging):
  // 1. Replace the API_BASE constant below with your server URL.
  //    Example: const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/auth';
  // 2. Ensure CORS is enabled on the backend server for your frontend domain.
  // ══════════════════════════════════════════════════════════════════════════
  const API_BASE = '/api/auth';

  const fetchUser = async () => {
    try {
      const r = await fetch(`${API_BASE}/me`, { credentials: 'include' });
      if (r.ok) {
        const data = await r.json();
        setUser(data);
      }
    } catch (e) {}
  };

  // On mount: try to restore session
  useEffect(() => {
    fetchUser().finally(() => {
      setTimeout(() => setIsLoading(false), 0);
    });
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }
    setUser(data);
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
      credentials: 'include',
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    // We don't automatically set user according to requirements, just succeed or throw
  };

  const verifyEmail = async (token: string) => {
    const res = await fetch(`${API_BASE}/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      credentials: 'include',
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Email verification failed');
    setUser(data);
  };

  const logout = async () => {
    await fetch(`${API_BASE}/logout`, { method: 'POST', credentials: 'include' });
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, verifyEmail, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
