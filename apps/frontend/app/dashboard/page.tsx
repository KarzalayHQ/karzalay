'use client';

/* ═══════════════════════════════════════════
 * File: app/dashboard/page.tsx
 * Purpose: Main dashboard landing route after authentication and onboarding.
 * Displays "The dashboard is coming soon." placeholder.
 * ═══════════════════════════════════════════ */

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/ui/Navbar';
import { OnboardingGuard } from '@/components/OnboardingGuard';
import { Skeleton } from '@/components/ui/Skeleton';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem', width: '100%' }}>
          <Skeleton style={{ width: '40%', height: '2rem', marginBottom: '1rem' }} />
          <Skeleton style={{ width: '100%', height: '200px', borderRadius: '16px' }} />
        </main>
      </div>
    );
  }

  return (
    <OnboardingGuard>
      <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', flexDirection: 'column' }}>
        <Navbar />

        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '3.5rem 2rem',
            border: '1px solid rgba(91,63,248,0.12)',
            boxShadow: '0 12px 36px rgba(91,63,248,0.06)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'rgba(108,60,224,0.08)',
              color: '#6C3CE0',
              fontSize: '28px',
              marginBottom: '1.5rem'
            }}>
              🚀
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 900, color: '#1C1233', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              The dashboard is coming soon
            </h1>

            <p style={{ color: '#5A5270', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
              Welcome{user?.name ? `, ${user.name}` : ''}! We are preparing the core system features. Stay tuned!
            </p>

            {user && (
              <div style={{ display: 'inline-block', background: '#FAF8FF', padding: '0.6rem 1.25rem', borderRadius: '999px', fontSize: '0.875rem', color: '#6C3CE0', fontWeight: 600, border: '1px solid rgba(108,60,224,0.12)' }}>
                LoggedIn as {user.email} · <span style={{ textTransform: 'uppercase' }}>{user.role}</span>
              </div>
            )}
          </div>
        </main>
      </div>
    </OnboardingGuard>
  );
}

