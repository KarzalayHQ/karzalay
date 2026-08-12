'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/ui/Navbar';
import { OnboardingGuard } from '@/components/OnboardingGuard';
import { CredentialCard, CredentialData } from '@/components/ui/CredentialCard';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const [credential, setCredential] = useState<CredentialData | null>(null);

  useEffect(() => {
    if (user) {
      // In a real app, we'd fetch this from the backend.
      // For the mock, we simulate building the credential from their current auth state.
      setCredential({
        name: user.name || 'Anonymous Member',
        role: user.role?.toUpperCase() === 'LEAD' ? 'Lead Founder' : 'Member',
        company: 'Your Startup',
        attendanceScore: 100, // Perfect attendance by default for mock
        commitCount: 42,
        duration: '1 Week',
        isVerified: true,
        signature: `0xmock${user.id || 'abc'}hash9f0e1d2c3b4a5f6e7d8c`,
        issuedAt: new Date().toISOString()
      });
    }
  }, [user]);

  if (isLoading || !user) {
    return null; // The OnboardingGuard will handle unauthenticated states
  }

  return (
    <OnboardingGuard>
      <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
        <Navbar />

        <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          
          <div style={{ marginBottom: '2.5rem' }}>
            <p className="kz-section-tag" style={{ textAlign: 'left', marginBottom: '0.4rem' }}>Your Profile</p>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--foreground)', marginBottom: '0.5rem' }}>
              Welcome back, {user.name}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              Manage your attendance, verify your credentials, and view your startup details.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Left Column: Dashboard & Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Current Status Block */}
              <div className="kz-step" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--foreground)' }}>Current Placement</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--surface2)', borderRadius: '8px', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Company</span>
                  <span style={{ fontWeight: 600, color: 'var(--foreground)' }}>Your Startup</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--surface2)', borderRadius: '8px', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Role</span>
                  <span style={{ fontWeight: 600, color: 'var(--foreground)', textTransform: 'capitalize' }}>{user.role}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--surface2)', borderRadius: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Status</span>
                  <span style={{ fontWeight: 600, color: 'var(--accent)' }}>Active in Sprint W7</span>
                </div>
              </div>

              {/* Attendance History */}
              <div className="kz-step" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--foreground)' }}>Attendance History</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  Your standup submissions contribute to your Verified Credential attendance score.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', background: 'var(--surface2)', borderRadius: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                    <span style={{ fontSize: '0.9rem' }}>Today's Standup</span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Submitted</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', background: 'var(--surface2)', borderRadius: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                    <span style={{ fontSize: '0.9rem' }}>Yesterday's Standup</span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Submitted</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Credential Card */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: 'var(--foreground)' }}>Your Verified Credential</h3>
                <span className="kz-badge" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>Publicly Viewable</span>
              </div>
              {credential && (
                <div style={{ width: '100%' }}>
                  <CredentialCard credential={credential} />
                </div>
              )}
              <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                Recruiters can verify your credential at:<br/>
                <a href={`/verify/${user.id}`} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline', marginTop: '0.5rem', display: 'inline-block' }}>
                  karzalay.com/verify/{user.id}
                </a>
              </p>
            </div>

          </div>
          
        </main>
      </div>
    </OnboardingGuard>
  );
}
