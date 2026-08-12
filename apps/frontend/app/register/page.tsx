"use client";

/* ═══════════════════════════════════════════
 * File: app/register/page.tsx
 * Purpose: Registration form for new users.
 * Design Decisions:
 * - Simple card layout using global .auth-* utility classes to mimic the rest of the application's auth UI.
 * - Client-side field validation to reduce unnecessary network requests.
 * Tokens Used:
 * - var(--destructive) used for error states.
 * Component Connections:
 * - Redirects to /onboarding after successful registration via AuthContext.
 * ═══════════════════════════════════════════ */

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from '@/components/ui/Navbar';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("member");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = "Full name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await register(name, email, password, role.toUpperCase());
      router.push("/onboarding");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      const apiErrors: { [key: string]: string } = {};
      const lowerMsg = msg.toLowerCase();
      
      if (lowerMsg.includes("email") || lowerMsg.includes("already registered")) {
        apiErrors.email = msg;
      } else if (lowerMsg.includes("password")) {
        apiErrors.password = msg;
      } else if (lowerMsg.includes("role")) {
        apiErrors.role = msg;
      } else {
        apiErrors.general = msg;
      }
      setErrors(apiErrors);
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
            <h1 className="auth-title">Create account</h1>
            <p className="auth-subtitle">Join Karzalay — India&apos;s sprint network</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {errors.general && (
              <div style={{ color: "var(--destructive)", background: "var(--destructive-light, #fee2e2)", padding: "0.75rem", borderRadius: "0.5rem", fontSize: "0.875rem", marginBottom: "1rem" }}>
                {errors.general}
              </div>
            )}
            <div className="auth-field">
              <label htmlFor="name" className="auth-label">Full Name</label>
              <input
                id="name"
                type="text"
                className={`auth-input${errors.name ? " auth-input-error" : ""}`}
                placeholder="Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              {errors.name && <span className="auth-error">{errors.name}</span>}
            </div>

            <div className="auth-field">
              <label htmlFor="email" className="auth-label">Email Address</label>
              <input
                id="email"
                type="email"
                className={`auth-input${errors.email ? " auth-input-error" : ""}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              {errors.email && <span className="auth-error">{errors.email}</span>}
            </div>

            <div className="auth-field">
              <label htmlFor="password" className="auth-label">Password</label>
              <input
                id="password"
                type="password"
                className={`auth-input${errors.password ? " auth-input-error" : ""}`}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              {errors.password && <span className="auth-error">{errors.password}</span>}
            </div>

            <div className="auth-field">
              <label htmlFor="confirmPassword" className="auth-label">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                className={`auth-input${errors.confirmPassword ? " auth-input-error" : ""}`}
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
              {errors.confirmPassword && <span className="auth-error">{errors.confirmPassword}</span>}
            </div>

            <div className="auth-field">
              <label htmlFor="role" className="auth-label">Role</label>
              <select
                id="role"
                className="auth-input auth-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="member">Member</option>
                <option value="lead">Lead</option>
              </select>
            </div>

            <button type="submit" className="kz-btn kz-btn-primary auth-submit" disabled={loading}>
              {loading ? "Creating..." : "Create account →"}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link href="/login" className="auth-link">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
