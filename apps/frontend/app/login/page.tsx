"use client";

/* ═══════════════════════════════════════════
 * File: app/login/page.tsx
 * Purpose: User authentication and login page.
 * Design Decisions:
 * - Uses a centered, card-based UI with `.auth-` prefixed global CSS classes for styling.
 * - Client-side validation and loading states to give immediate feedback.
 * Tokens Used:
 * - Relies entirely on global CSS classes (from tokens.css/globals.css) rather than inline styles.
 * Component Connections:
 * - Consumes login from AuthContext.
 * ═══════════════════════════════════════════ */

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Navbar } from '@/components/ui/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar />

      {/* Centered card */}
      <div className="auth-container">
        <div className="auth-card">
          {/* Logo mark */}
          <div className="auth-logo-mark">K</div>

          <div className="auth-header">
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Log in to your Karzalay account</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="email" className="auth-label">Email Address</label>
              <input
                id="email"
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="password" className="auth-label">Password</label>
                <Link href="#" className="auth-forgot">Forgot password?</Link>
              </div>
              <input
                id="password"
                type="password"
                className="auth-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="kz-btn kz-btn-primary auth-submit" disabled={loading}>
              {loading ? "Logging in…" : "Log in →"}
            </button>
          </form>

          <p className="auth-footer-text">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="auth-link">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
