'use client';

/* ═══════════════════════════════════════════
 * File: components/OnboardingGuard.tsx
 * Purpose: Client-side routing wrapper to enforce onboarding completion before accessing protected routes.
 * Design Decisions:
 * - Performs an asynchronous status check to `/api/onboarding/status`.
 * - Redirects to `/onboarding` if incomplete, or `/` if trying to re-run it when completed.
 * Tokens Used:
 * - Uses var(--background) and global .kz-badge for the loading state.
 * Component Connections:
 * - Wraps most Dashboard and restricted routes.
 * ═══════════════════════════════════════════ */

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();
  const [statusLoading, setStatusLoading] = useState(true);
  const [gate, setGate] = useState<number | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      // Not authenticated, middleware should handle this but just in case
      setStatusLoading(false);
      return;
    }

    const checkStatus = async () => {
      try {
        const isApply = searchParams.get('apply') === 'true';
        const res = await fetch('/api/onboarding/status', { credentials: 'include' });
        if (!res.ok) {
          throw new Error('Failed to fetch status');
        }
        const data = await res.json();
        const currentGate = data.gate || 1;
        setGate(currentGate);

        const isCompleted = currentGate > 3 || data.status === 'completed';

        if (isCompleted && pathname.startsWith('/onboarding') && !isApply) {
          router.push('/');
        } else if (!isCompleted && !pathname.startsWith('/onboarding') && pathname !== '/talent' && pathname !== '/cities' && !pathname.startsWith('/cities/')) {
          router.push('/onboarding');
        } else {
          setStatusLoading(false);
        }
      } catch (e) {
        console.error('Onboarding status error:', e);
        // Fallback: allow render if we can't determine
        setStatusLoading(false);
      }
    };

    checkStatus();
  }, [user, authLoading, pathname, router]);

  if (authLoading || statusLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
        <div className="kz-badge" style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}>Loading…</div>
      </div>
    );
  }

  return <>{children}</>;
}
