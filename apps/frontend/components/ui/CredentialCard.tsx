'use client';

/* ═══════════════════════════════════════════
 * File: components/ui/CredentialCard.tsx
 * Purpose: Reusable card component to display a user's verified credentials.
 * Design Decisions:
 * - Highly stylized glassmorphism (backdrop-filter) and 3D glow effects.
 * - Simulates a GitHub contribution graph using a dynamic color scale.
 * Tokens Used:
 * - Uses var(--text-muted), var(--foreground), var(--primary) for text.
 * - Dynamic hex colors for the contribution graph (#0e4429, #006d32, #26a641) matching GitHub dark mode.
 * Component Connections:
 * - Used in Profile, Verify, and Landing pages.
 * ═══════════════════════════════════════════ */

import React from 'react';

export interface CredentialData {
  name: string;
  role: string;
  company: string;
  attendanceScore: number;
  commitCount: number;
  duration: string;
  isVerified: boolean;
  signature: string;
  issuedAt: string;
  verifiedImpact?: string;
  contributions?: { date: string; count: number }[];
}

interface CredentialCardProps {
  credential: CredentialData;
}

export function CredentialCard({ credential }: CredentialCardProps) {
  // Helper to get color for contribution intensity based on GitHub's dark mode palette
  const getContributionColor = (count: number) => {
    if (count === 0) return 'rgba(255, 255, 255, 0.08)'; // Empty (subtle gray)
    if (count === 1) return '#0e4429'; // Low
    if (count === 2) return '#006d32'; // Medium
    return '#26a641'; // High
  };

  return (
    <div 
      className="kz-credential-card"
      style={{
        width: '100%',
        maxWidth: '600px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '2.5rem',
        boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.05) inset',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Dynamic 3D Glow Effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.2), transparent 45%), radial-gradient(circle at 100% 100%, rgba(34, 197, 94, 0.1), transparent 40%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Header & Trust Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
          <div>
            <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Verified Member
            </p>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--foreground)', lineHeight: 1.1, marginBottom: '0.35rem' }}>
              {credential.name}
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 500 }}>
              {credential.role} <span style={{ color: 'var(--text-muted)' }}>at</span> {credential.company}
            </p>
          </div>

          {/* Glowing Trust Badge */}
          {credential.isVerified && (
            <div 
              title="Cryptographically Verified"
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 25px rgba(34, 197, 94, 0.3)',
                flexShrink: 0
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12C21.9988 14.1564 21.3001 16.2547 20.0093 17.9818C18.7185 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999M22 4L12 14.01L8.6 10.61" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(0,0,0,0.15)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Attendance Score</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--foreground)' }}>{credential.attendanceScore}%</p>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Total Commits</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--foreground)' }}>{credential.commitCount.toLocaleString()}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Duration</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--foreground)' }}>{credential.duration}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Issued On</p>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--foreground)' }}>
              {new Date(credential.issuedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Verified Impact (Lead Confirmed) */}
        {credential.verifiedImpact && (
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Verified Business Impact
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--foreground)', lineHeight: 1.6, paddingLeft: '1rem', borderLeft: '2px solid var(--primary)' }}>
              {credential.verifiedImpact}
            </p>
          </div>
        )}

        {/* GitHub-style Contribution Graph */}
        {credential.contributions && credential.contributions.length > 0 && (
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>12-Week Contribution Activity</p>
            <div style={{ 
              display: 'flex', 
              gap: '4px',
              flexWrap: 'wrap',
              background: 'rgba(255,255,255,0.03)',
              padding: '1.25rem',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
            }}>
              {credential.contributions.map((day, i) => (
                <div 
                  key={i} 
                  title={`${day.date}: ${day.count} contributions`}
                  style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '3px', 
                    backgroundColor: getContributionColor(day.count),
                    boxShadow: day.count > 0 ? `0 0 4px ${getContributionColor(day.count)}40` : 'none',
                    transition: 'transform 0.2s ease',
                  }} 
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              ))}
            </div>
          </div>
        )}

        {/* Signature Hash */}
        <div style={{ 
          background: 'rgba(255,255,255,0.02)', 
          padding: '1.2rem', 
          borderRadius: '12px', 
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.02)'
        }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Cryptographic Signature &bull; Immutable Record
          </p>
          <p style={{ 
            fontFamily: 'monospace', 
            fontSize: '0.85rem', 
            color: 'var(--accent)', 
            wordBreak: 'break-all',
            lineHeight: 1.5,
            opacity: 0.9
          }}>
            {credential.signature}
          </p>
        </div>

      </div>
    </div>
  );
}
