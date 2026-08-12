"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Shield,
  Users,
  Zap,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ChevronLeft
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

/* ─── Design Tokens ─── */
const PURPLE = "#5B3FF8";
const PURPLE_MID = "#7C3AED";
const PURPLE_LIGHT = "#A78BFA";
const PURPLE_SOFT = "#EDE9FE";
const PURPLE_XSOFT = "#F5F3FF";
const INK = "#1A1040";
const INK_MID = "#3D3A5C";
const INK_LIGHT = "#6B6887";
const GREEN = "#16A34A";

const gradientText = {
  background: "linear-gradient(135deg, #5B3FF8 0%, #8B5CF6 50%, #A78BFA 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};
const gradientBg = "linear-gradient(135deg, #5B3FF8 0%, #8B5CF6 50%, #A78BFA 100%)";
const cardShadow = "0 2px 12px rgba(91,63,248,0.07)";
const cardShadowHover = "0 16px 40px rgba(91,63,248,0.13)";

/* ─── Floating Particles ─── */
function FloatingParticles() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: 6 + i * 5,
            height: 6 + i * 5,
            borderRadius: "50%",
            background: `rgba(91, 63, 248, ${0.02 + i * 0.008})`,
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 4) * 22}%`,
          }}
          animate={{ y: [0, -25, 0], x: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        />
      ))}
    </div>
  );
}

/* ─── Stats Badge ─── */
function StatsBadge({ icon: Icon, value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 1rem",
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(10px)",
        borderRadius: 12,
        border: "1px solid rgba(91,63,248,0.08)",
      }}
    >
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: PURPLE_XSOFT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Icon size={18} color={PURPLE} />
      </div>
      <div>
        <p style={{ fontSize: "0.85rem", fontWeight: 800, color: INK, margin: 0, letterSpacing: "-0.02em" }}>{value}</p>
        <p style={{ fontSize: "0.7rem", color: INK_LIGHT, margin: 0 }}>{label}</p>
      </div>
    </motion.div>
  );
}

/* ─── Styled Input ─── */
function AuthInput({ value, onChange, placeholder, type = "text", icon: Icon, required = false, autoComplete }) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div style={{ position: "relative" }}>
      <Icon
        size={18}
        color={focused ? PURPLE : INK_LIGHT}
        style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", zIndex: 2, transition: "color 0.2s ease" }}
      />
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: isPassword ? "0.85rem 2.75rem 0.85rem 2.75rem" : "0.85rem 1rem 0.85rem 2.75rem",
          borderRadius: 12,
          border: `1.5px solid ${focused ? PURPLE : "rgba(91,63,248,0.15)"}`,
          background: focused ? "#FAF8FF" : "#F8F7FC",
          color: INK,
          fontSize: "0.9rem",
          fontFamily: "inherit",
          outline: "none",
          transition: "all 0.2s ease",
          boxSizing: "border-box",
        }}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            color: INK_LIGHT,
          }}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   LOGIN PAGE
   ═══════════════════════════════════════════ */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #F5F3FF 0%, #fff 40%, #fff 60%, #F5F3FF 100%)",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    }}>
      <FloatingParticles />

      {/* Mesh gradient */}
      <div style={{
        position: "fixed",
        inset: 0,
        background: "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(91,63,248,0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(167,139,250,0.04) 0%, transparent 50%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Back to home */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ position: "absolute", top: "1.5rem", left: "1.5rem", zIndex: 10 }}
      >
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          color: INK_LIGHT,
          fontSize: "0.85rem",
          fontWeight: 600,
          textDecoration: "none",
          transition: "color 0.2s ease",
        }}>
          <ChevronLeft size={16} /> Back to home
        </Link>
      </motion.div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1100, padding: "2rem 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>

        {/* ─── LEFT: Branding & Trust ─── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.04em", ...gradientText, margin: "0 0 1rem", lineHeight: 1.15 }}
            >
              Welcome back to<br />Karzalay
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: "1rem", color: INK_MID, lineHeight: 1.7, margin: 0, maxWidth: 400 }}
            >
              Log in to access your dashboard, submit standups, track sprints, and build your verifiable work credential.
            </motion.p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <StatsBadge icon={Users} value="2,400+" label="Active Members" />
            <StatsBadge icon={Shield} value="100%" label="Verified Credentials" />
            <StatsBadge icon={Zap} value="12 Cities" label="Across India" />
          </div>

          {/* Trust quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              padding: "1.25rem 1.5rem",
              background: "rgba(255,255,255,0.5)",
              backdropFilter: "blur(10px)",
              borderRadius: 16,
              border: "1px solid rgba(91,63,248,0.08)",
              maxWidth: 380,
            }}
          >
            <p style={{ fontSize: "0.85rem", color: INK_MID, lineHeight: 1.6, margin: "0 0 0.75rem", fontStyle: "italic" }}>
              "Karzalay gave me the real work experience I needed. I landed my first job within 3 months of completing my credential."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: gradientBg, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.8rem", fontWeight: 700 }}>
                RJ
              </div>
              <div>
                <p style={{ fontSize: "0.8rem", fontWeight: 700, color: INK, margin: 0 }}>Rahul Joshi</p>
                <p style={{ fontSize: "0.7rem", color: INK_LIGHT, margin: 0 }}>Frontend Dev @ Nexus UI</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── RIGHT: Login Form ─── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            whileHover={{ y: -3, boxShadow: cardShadowHover }}
            transition={{ duration: 0.22 }}
            style={{
              background: "#fff",
              borderRadius: 24,
              border: "1px solid rgba(91,63,248,0.12)",
              boxShadow: cardShadow,
              padding: "2.5rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top gradient bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: gradientBg }} />

            {/* Logo mark */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: gradientBg,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <Sparkles size={28} color="#fff" />
              </motion.div>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: "0 0 0.25rem" }}>
                Log in to Karzalay
              </h2>
              <p style={{ fontSize: "0.8rem", color: INK_LIGHT, margin: 0 }}>
                Enter your credentials to continue
              </p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: 10,
                  padding: "0.65rem 0.875rem",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#DC2626",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                <AlertCircle size={15} /> {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: INK_MID, marginBottom: "0.35rem" }}>
                  Email Address
                </label>
                <AuthInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  icon={Mail}
                  required
                  autoComplete="email"
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: INK_MID }}>Password</label>
                  <Link href="#" style={{ fontSize: "0.75rem", color: PURPLE, fontWeight: 600, textDecoration: "none" }}>
                    Forgot password?
                  </Link>
                </div>
                <AuthInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  icon={Lock}
                  required
                  autoComplete="current-password"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  width: "100%",
                  padding: "0.9rem",
                  borderRadius: 12,
                  border: "none",
                  background: gradientBg,
                  color: "#fff",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  cursor: loading ? "wait" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  boxShadow: "0 6px 20px rgba(91,63,248,0.38)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <>
                  Log in <ArrowRight size={18} />
                </>}
              </motion.button>
            </form>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0" }}>
              <div style={{ flex: 1, height: 1, background: "rgba(91,63,248,0.1)" }} />
              <span style={{ fontSize: "0.75rem", color: INK_LIGHT, fontWeight: 500 }}>or</span>
              <div style={{ flex: 1, height: 1, background: "rgba(91,63,248,0.1)" }} />
            </div>

            {/* Register link */}
            <p style={{ textAlign: "center", fontSize: "0.85rem", color: INK_MID, margin: 0 }}>
              Don't have an account?{" "}
              <Link href="/register" style={{ color: PURPLE, fontWeight: 700, textDecoration: "none" }}>
                Create one free
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile: stack layout */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
