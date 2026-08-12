"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Shield,
  Users,
  Zap,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ChevronLeft,
  Briefcase,
  Crown,
  CheckCircle2
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
const GREEN_SOFT = "#DCFCE7";

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

/* ─── Role Selection Card ─── */
function RoleCard({ role, selected, onClick, icon: Icon, title, description, features }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -3, rotateX: 2 }}
      whileTap={{ scale: 0.98 }}
      style={{
        padding: "1.25rem",
        borderRadius: 14,
        border: `2px solid ${selected ? PURPLE : "rgba(91,63,248,0.1)"}`,
        background: selected ? PURPLE_XSOFT : "#fff",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.22s ease",
        boxShadow: selected ? "0 4px 16px rgba(91,63,248,0.1)" : "none",
      }}
    >
      {selected && (
        <div style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: "50%", background: gradientBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CheckCircle2 size={12} color="#fff" strokeWidth={3} />
        </div>
      )}
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: selected ? gradientBg : PURPLE_XSOFT,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "0.6rem",
      }}>
        <Icon size={20} color={selected ? "#fff" : PURPLE} strokeWidth={2} />
      </div>
      <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: INK, margin: "0 0 0.15rem" }}>{title}</h4>
      <p style={{ fontSize: "0.75rem", color: INK_LIGHT, margin: "0 0 0.5rem", lineHeight: 1.5 }}>{description}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", color: INK_MID }}>
            <Zap size={11} color={GREEN} /> {f}
          </div>
        ))}
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
      <Icon size={18} color={focused ? PURPLE : INK_LIGHT} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", zIndex: 2, transition: "color 0.2s ease" }} />
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
        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 4, color: INK_LIGHT }}>
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   REGISTER PAGE
   ═══════════════════════════════════════════ */
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      await register(name, email, password, role);
      router.push("/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Password strength
  const strength = !password ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColors = ["transparent", "#EF4444", "#F59E0B", GREEN];
  const strengthLabels = ["", "Weak", "Good", "Strong"];

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
      <div style={{
        position: "fixed", inset: 0,
        background: "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(91,63,248,0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(167,139,250,0.04) 0%, transparent 50%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Back to home */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ position: "absolute", top: "1.5rem", left: "1.5rem", zIndex: 10 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: INK_LIGHT, fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
          <ChevronLeft size={16} /> Back to home
        </Link>
      </motion.div>

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480, padding: "2rem 1.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              style={{
                width: 56, height: 56, borderRadius: 16, background: gradientBg,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginBottom: "0.75rem",
              }}
            >
              <Sparkles size={28} color="#fff" />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              style={{ display: "inline-block", padding: "0.3rem 0.8rem", borderRadius: 999, background: GREEN_SOFT, marginBottom: "0.5rem" }}
            >
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: GREEN }}>Free forever · No credit card</span>
            </motion.div>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: "0 0 0.25rem" }}>
              Create your account
            </h2>
            <p style={{ fontSize: "0.8rem", color: INK_LIGHT, margin: 0 }}>
              Join 2,400+ members building real experience
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "0.65rem 0.875rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "#DC2626", fontSize: "0.8rem", fontWeight: 600 }}
            >
              <AlertCircle size={15} /> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: INK_MID, marginBottom: "0.35rem" }}>Full Name</label>
              <AuthInput value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" icon={User} required autoComplete="name" />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: INK_MID, marginBottom: "0.35rem" }}>Email Address</label>
              <AuthInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" icon={Mail} required autoComplete="email" />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: INK_MID, marginBottom: "0.35rem" }}>Password</label>
              <AuthInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" icon={Lock} required autoComplete="new-password" />
              {password && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.4rem" }}>
                  <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#EDE9FE", overflow: "hidden" }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(strength / 3) * 100}%` }} style={{ height: "100%", background: strengthColors[strength], borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, color: strengthColors[strength] }}>{strengthLabels[strength]}</span>
                </div>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: INK_MID, marginBottom: "0.5rem" }}>I want to...</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <RoleCard role="MEMBER" selected={role === "MEMBER"} onClick={() => setRole("MEMBER")} icon={Briefcase}
                  title="Join a Company" description="Work on real projects" features={["Apply to companies", "Earn credentials"]} />
                <RoleCard role="LEAD" selected={role === "LEAD"} onClick={() => setRole("LEAD")} icon={Crown}
                  title="Lead a Company" description="Build your own team" features={["Create company", "Recruit members"]} />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              style={{
                width: "100%", padding: "0.9rem", borderRadius: 12, border: "none",
                background: gradientBg, color: "#fff", fontSize: "0.95rem", fontWeight: 700,
                fontFamily: "inherit", cursor: loading ? "wait" : "pointer", opacity: loading ? 0.7 : 1,
                boxShadow: "0 6px 20px rgba(91,63,248,0.38)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.25rem",
              }}
            >
              {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <>Create Account <ArrowRight size={18} /></>}
            </motion.button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.25rem 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(91,63,248,0.1)" }} />
            <span style={{ fontSize: "0.75rem", color: INK_LIGHT, fontWeight: 500 }}>already have an account?</span>
            <div style={{ flex: 1, height: 1, background: "rgba(91,63,248,0.1)" }} />
          </div>

          <p style={{ textAlign: "center", fontSize: "0.85rem", color: INK_MID, margin: 0 }}>
            <Link href="/login" style={{ color: PURPLE, fontWeight: 700, textDecoration: "none" }}>
              Log in instead
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
