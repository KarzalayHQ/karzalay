'use client';

/* ═══════════════════════════════════════════
 * File: components/ui/Navbar.tsx
 * Purpose: Global navigation header for the application.
 * Design Decisions:
 * - Sticky positioning with backdrop-blur for a modern floating glassmorphism effect.
 * - Responsive design conditionally showing a hamburger menu on mobile and hiding desktop nav.
 * Tokens Used:
 * - Hardcoded rgba styles for the blur background to ensure compatibility.
 * Component Connections:
 * - Pulls authentication state from AuthContext.
 * - Conditionally renders the LogoutButton.
 * ═══════════════════════════════════════════ */

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LogoutButton } from '@/components/ui/LogoutButton';

export function Navbar() {
  const { user, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 40px',
        background: 'rgba(255,255,255,0.78)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(28,18,51,0.06)'
      }}>
        <Link href="/" style={{ textDecoration: 'none', color: '#1C1233', display: 'flex', alignItems: 'center', gap: '11px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '10px', 
            background: 'linear-gradient(135deg,#7C4DFF,#6C3CE0)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: '#fff', fontWeight: 800, fontSize: '18px', 
            boxShadow: '0 6px 16px rgba(108,60,224,0.4)'
          }}>
            K
          </div>
          <span style={{ fontWeight: 800, fontSize: '21px', letterSpacing: '-0.02em' }}>
            Karzalay
          </span>
        </Link>
        
        {/* Desktop Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '30px' }} className="kz-nav-desktop-only">
          <Link href="/cities" style={{ textDecoration: 'none', color: '#5A5270', fontSize: '15px', fontWeight: 500 }}>
            Browse Companies
          </Link>
          <Link href="/talent" style={{ textDecoration: 'none', color: '#5A5270', fontSize: '15px', fontWeight: 500 }}>
            Talent Board
          </Link>
          
          {!isLoading && (
            <>
              {user ? (
                <>
                  <Link href="/dashboard" style={{ textDecoration: 'none', color: '#5A5270', fontSize: '15px', fontWeight: 500 }}>Dashboard</Link>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <Link href="/login" style={{ textDecoration: 'none', color: '#1C1233', fontSize: '15px', fontWeight: 700 }}>
                    Login
                  </Link>
                  <Link href="/register" className="kz-cta" style={{
                    textDecoration: 'none', 
                    background: 'linear-gradient(135deg,#7C4DFF,#6C3CE0)', 
                    color: '#fff', padding: '11px 22px', borderRadius: '999px', 
                    fontSize: '15px', fontWeight: 700, 
                    boxShadow: '0 8px 20px rgba(108,60,224,0.32)'
                  }}>
                    Get Started
                  </Link>
                </>
              )}
            </>
          )}
        </nav>

        {/* Hamburger Icon (Mobile) */}
        <button 
          className={`kz-hamburger ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          style={{ display: 'none' /* Will be overridden by media query in global css */ }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      <div className={`kz-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="kz-mobile-nav-links">
          <li>
            <Link href="/cities" onClick={toggleMobileMenu}>Browse Companies</Link>
          </li>
          <li>
            <Link href="/talent" onClick={toggleMobileMenu} style={{ color: 'var(--accent)' }}>Talent Board</Link>
          </li>
          
          {!isLoading && (
            <>
              {user ? (
                <>
                  <li><Link href="/profile" onClick={toggleMobileMenu}>Profile</Link></li>
                  <li><Link href="/dashboard" onClick={toggleMobileMenu}>Dashboard</Link></li>
                  <li>
                    <div onClick={toggleMobileMenu} style={{ width: '100%', display: 'flex' }}>
                      <LogoutButton />
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li><Link href="/login" onClick={toggleMobileMenu}>Login</Link></li>
                  <li>
                    <Link href="/register" className="kz-btn kz-btn-primary" onClick={toggleMobileMenu} style={{ marginTop: '0.5rem' }}>
                      Get Started →
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
      
      <style>{`
        @media (max-width: 1024px) {
          .kz-nav-desktop-only { display: none !important; }
          .kz-hamburger { display: flex !important; }
          header { padding: 16px 20px !important; }
        }
      `}</style>
    </>
  );
}
