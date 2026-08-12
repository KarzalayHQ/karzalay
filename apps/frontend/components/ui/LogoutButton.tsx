'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton = ({ className = '' }: LogoutButtonProps) => {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout(); // logout() calls window.location.href = '/login' on success
    } catch {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`kz-btn kz-btn-outline ${className}`}
      style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', height: '36px' }}
    >
      {loading ? 'Logging out…' : 'Log out'}
    </button>
  );
};
