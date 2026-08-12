"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Globe,
  Building2,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Users,
  ClipboardList,
  Copy,
  Check,
  Sparkles,
  Loader2,
  MapPin,
  Link as LinkIcon,
  FileText,
  ChevronRight,
  Crown,
  Zap,
  Shield,
  Clock,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { OnboardingGuard } from "@/components/OnboardingGuard";
import { io, Socket } from "socket.io-client";

/* ─── Design Tokens (match landing page) ─── */
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

/* ─── Step Config ─── */
const STEPS = [
  { num: 1, label: "Profile", icon: User, desc: "Who you are" },
  { num: 2, label: "Choose Path", icon: role => role === "LEAD" ? Rocket : Building2, desc: "Your journey" },
  { num: 3, label: "Get Started", icon: ClipboardList, desc: "First action" },
];

/* ─── Animated Background Particles ─── */
function FloatingParticles() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: 8 + i * 6,
            height: 8 + i * 6,
            borderRadius: "50%",
            background: `rgba(91, 63, 248, ${0.03 + i * 0.01})`,
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Stepper Component ─── */
function Stepper({ currentStep, role }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      {/* Progress background bar */}
      <div style={{ position: "relative", height: 4, background: "#EDE9FE", borderRadius: 2, marginBottom: "1.25rem", overflow: "hidden" }}>
        <motion.div
          style={{ height: "100%", background: gradientBg, borderRadius: 2 }}
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>

      {/* Step circles + labels */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        {STEPS.map((step, idx) => {
          const isActive = currentStep === step.num;
          const isCompleted = currentStep > step.num;
          const StepIcon = typeof step.icon === "function" ? step.icon(role) : step.icon;

          return (
            <div key={step.num} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", flex: 1 }}>
              <motion.div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: isCompleted ? gradientBg : isActive ? "#fff" : PURPLE_XSOFT,
                  border: isActive ? `2px solid ${PURPLE}` : isCompleted ? "none" : `2px solid ${PURPLE_SOFT}`,
                  boxShadow: isActive ? "0 4px 16px rgba(91,63,248,0.2)" : "none",
                  position: "relative",
                }}
                animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <CheckCircle2 size={22} color="#fff" />
                ) : (
                  <StepIcon size={20} color={isActive ? PURPLE : INK_LIGHT} strokeWidth={2} />
                )}
                {isActive && (
                  <motion.div
                    style={{
                      position: "absolute",
                      inset: -4,
                      borderRadius: "50%",
                      border: `2px solid ${PURPLE}`,
                      opacity: 0.3,
                    }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
              <div style={{ textAlign: "center" }}>
                <p style={{
                  fontSize: "0.8rem",
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? INK : isCompleted ? PURPLE : INK_LIGHT,
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}>
                  {step.label}
                </p>
                <p style={{
                  fontSize: "0.7rem",
                  color: INK_LIGHT,
                  margin: "0.1rem 0 0",
                  letterSpacing: "0.02em",
                }}>
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Eyebrow Label ─── */
function Eyebrow({ children }) {
  return (
    <p style={{
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "2px",
      textTransform: "uppercase",
      ...gradientText,
      marginBottom: "0.75rem",
    }}>
      {children}
    </p>
  );
}

/* ─── Glass Card ─── */
function GlassCard({ children, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 2 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -20, rotateX: -2 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        background: "#fff",
        borderRadius: 20,
        border: "1px solid rgba(91,63,248,0.12)",
        boxShadow: cardShadow,
        padding: "2.5rem",
        maxWidth: 640,
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Subtle gradient top bar */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: gradientBg,
      }} />
      {children}
    </motion.div>
  );
}

/* ─── Primary Button ─── */
function KzButton({ children, onClick, type = "button", disabled = false, loading = false, variant = "primary", style = {} }) {
  const isPrimary = variant === "primary";
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      style={{
        width: "100%",
        padding: "0.9rem 1.5rem",
        borderRadius: 12,
        border: "none",
        fontSize: "0.95rem",
        fontWeight: 700,
        fontFamily: "inherit",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        background: isPrimary ? gradientBg : "transparent",
        color: isPrimary ? "#fff" : PURPLE,
        border: isPrimary ? "none" : `1.5px solid ${PURPLE_SOFT}`,
        boxShadow: isPrimary ? "0 6px 20px rgba(91,63,248,0.38)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        transition: "all 0.22s ease",
        ...style,
      }}
    >
      {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : children}
    </motion.button>
  );
}

/* ─── Styled Input ─── */
function KzInput({ value, onChange, placeholder = "", required = false, type = "text", icon: Icon }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      {Icon && (
        <Icon
          size={18}
          color={focused ? PURPLE : INK_LIGHT}
          style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", zIndex: 2, transition: "color 0.2s ease" }}
        />
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: Icon ? "0.85rem 1rem 0.85rem 2.75rem" : "0.85rem 1rem",
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
    </div>
  );
}

/* ─── Styled Textarea ─── */
function KzTextarea({ value, onChange, placeholder = "", required = false, rows = 4, label }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: INK_MID, marginBottom: "0.4rem" }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "0.85rem 1rem",
          borderRadius: 12,
          border: `1.5px solid ${focused ? PURPLE : "rgba(91,63,248,0.15)"}`,
          background: focused ? "#FAF8FF" : "#F8F7FC",
          color: INK,
          fontSize: "0.9rem",
          fontFamily: "inherit",
          outline: "none",
          resize: "vertical",
          minHeight: 80,
          transition: "all 0.2s ease",
          boxSizing: "border-box",
          lineHeight: 1.6,
        }}
      />
    </div>
  );
}

/* ─── Role Selection Card ─── */
function RoleCard({ role, selected, onClick, icon: Icon, title, description, features }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4, rotateX: 3, rotateY: 2 }}
      whileTap={{ scale: 0.98 }}
      style={{
        padding: "1.5rem",
        borderRadius: 16,
        border: `2px solid ${selected ? PURPLE : "rgba(91,63,248,0.1)"}`,
        background: selected ? PURPLE_XSOFT : "#fff",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.22s ease",
        boxShadow: selected ? "0 4px 20px rgba(91,63,248,0.12)" : "none",
        flex: 1,
      }}
    >
      {selected && (
        <div style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: gradientBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Check size={14} color="#fff" strokeWidth={3} />
        </div>
      )}
      <div style={{
        width: 48,
        height: 48,
        borderRadius: 14,
        background: selected ? gradientBg : PURPLE_XSOFT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "0.75rem",
      }}>
        <Icon size={24} color={selected ? "#fff" : PURPLE} strokeWidth={2} />
      </div>
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: INK, margin: "0 0 0.25rem" }}>{title}</h3>
      <p style={{ fontSize: "0.8rem", color: INK_LIGHT, margin: "0 0 0.75rem", lineHeight: 1.5 }}>{description}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: INK_MID }}>
            <Zap size={12} color={GREEN} />
            {f}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Company Card ─── */
function CompanyCard({ company, onApply, applying }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -5, rotateX: 3, rotateY: 2 }}
      style={{
        padding: "1.25rem 1.5rem",
        borderRadius: 16,
        border: `1.5px solid ${hovered ? "rgba(91,63,248,0.25)" : "rgba(91,63,248,0.1)"}`,
        background: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: hovered ? cardShadowHover : cardShadow,
        transition: "all 0.22s ease",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${PURPLE_SOFT}, #fff)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.3rem",
          fontWeight: 800,
          color: PURPLE,
        }}>
          {company.name.charAt(0)}
        </div>
        <div>
          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: INK, margin: "0 0 0.15rem" }}>{company.name}</h4>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: INK_LIGHT }}>
            <MapPin size={13} />
            {company.city}
            <span style={{ color: "rgba(91,63,248,0.2)" }}>|</span>
            <Users size={13} />
            {company.memberCount} members
            <span style={{
              padding: "0.15rem 0.5rem",
              borderRadius: 6,
              background: PURPLE_XSOFT,
              fontSize: "0.7rem",
              fontWeight: 700,
              color: PURPLE,
              marginLeft: "0.25rem",
            }}>
              {company.sprintWeek}
            </span>
          </div>
        </div>
      </div>
      <motion.button
        onClick={() => onApply(company.id)}
        disabled={applying}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: "0.6rem 1.25rem",
          borderRadius: 10,
          border: "none",
          background: gradientBg,
          color: "#fff",
          fontSize: "0.85rem",
          fontWeight: 700,
          fontFamily: "inherit",
          cursor: applying ? "wait" : "pointer",
          opacity: applying ? 0.7 : 1,
          boxShadow: "0 4px 12px rgba(91,63,248,0.3)",
          whiteSpace: "nowrap",
        }}
      >
        {applying ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : "Apply"}
      </motion.button>
    </motion.div>
  );
}

/* ─── Waiting State ─── */
function WaitingState({ onSimulate }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ textAlign: "center", padding: "2rem 0" }}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: PURPLE_XSOFT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Clock size={36} color={PURPLE} />
        </motion.div>
      </motion.div>

      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        borderRadius: 999,
        background: GREEN_SOFT,
        marginBottom: "1rem",
      }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: GREEN }} />
        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: GREEN }}>Application Sent</span>
      </div>

      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: INK, margin: "0 0 0.5rem" }}>
        Waiting for approval
      </h3>
      <p style={{ fontSize: "0.85rem", color: INK_LIGHT, margin: "0 0 1.5rem", lineHeight: 1.6, maxWidth: 360, marginLeft: "auto", marginRight: "auto" }}>
        Your application has been submitted to the company lead. You'll automatically advance once approved.
      </p>

      {/* Pulsing dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.4rem", marginBottom: "2rem" }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            style={{ width: 8, height: 8, borderRadius: "50%", background: PURPLE }}
          />
        ))}
      </div>

      <button
        onClick={onSimulate}
        style={{
          background: "none",
          border: "none",
          color: PURPLE,
          fontSize: "0.8rem",
          textDecoration: "underline",
          cursor: "pointer",
          opacity: 0.6,
        }}
      >
        [Dev] Simulate Lead Approval
      </button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN ONBOARDING PAGE
   ═══════════════════════════════════════════ */
export default function OnboardingPage() {
  const router = useRouter();
  const { user, fetchUser } = useAuth();

  const [gate, setGate] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // Gate 1
  const [name, setName] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [Globe, setGithub] = useState("");

  // Gate 2
  const [companies, setCompanies] = useState([]);
  const [applicationSent, setApplicationSent] = useState(false);
  const [socket, setSocket] = useState(null);

  // Gate 2 Lead
  const [startupName, setStartupName] = useState("");
  const [startupCity, setStartupCity] = useState("");
  const [startupDocUrl, setStartupDocUrl] = useState("");

  // Gate 3 Member
  const [yesterday, setYesterday] = useState("");
  const [today, setToday] = useState("");
  const [blockers, setBlockers] = useState("");

  // Completion
  const [completed, setCompleted] = useState(false);

  // Clipboard
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user && !name) {
      setName(user.name || "");
      setRole(user.role || "MEMBER");
    }
  }, [user]);

  useEffect(() => {
    const fetchStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const debugGate = urlParams.get("debug_gate");
      if (debugGate) {
        setGate(parseInt(debugGate, 10));
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/onboarding/status", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setGate(data.gate || 1);
          if (data.status === "completed" || data.gate > 3) {
            router.push("/dashboard");
          }
        }
      } catch (err) {
        console.error("Status fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [router]);

  useEffect(() => {
    if (gate === 2 && role === "MEMBER") {
      fetch("/api/companies", { credentials: "include" })
        .then(r => r.json())
        .then(setCompanies)
        .catch(console.error);

      const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
        withCredentials: true,
      });
      newSocket.on("application:approved", () => setGate(3));
      setSocket(newSocket);
      return () => newSocket.disconnect();
    }
  }, [gate, role]);

  const handleGate1Submit = async (e) => {
    e.preventDefault();
    if (!Globe.trim()) { setError("Globe username is required"); return; }
    setError("");
    setActionLoading(true);
    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, githubUsername: Globe }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update profile");
      await fetchUser();
      const statusRes = await fetch("/api/onboarding/status", { credentials: "include" });
      const data = await statusRes.json();
      setGate(data.gate || 2);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleApply = async (companyId) => {
    setError("");
    setActionLoading(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Application failed");
      setApplicationSent(true);
      if (!socket || !socket.connected) {
        setTimeout(() => setGate(3), 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleGate3Submit = async (e) => {
    e.preventDefault();
    setError("");
    setActionLoading(true);
    try {
      const res = await fetch("/api/standups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ yesterday, today, blockers }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to submit standup");
      setCompleted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateStartup = async (e) => {
    e.preventDefault();
    if (!startupName || !startupCity || !startupDocUrl) {
      setError("Please fill all fields");
      return;
    }
    setError("");
    setActionLoading(true);
    try {
      const res = await fetch("/api/startups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: startupName, city: startupCity, docUrl: startupDocUrl }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to create startup");
      setGate(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://karzalay.app/join/acme-corp-123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSkipInvite = async () => {
    try {
      await fetch("/api/onboarding/complete", { method: "POST", credentials: "include" });
    } catch (err) { console.error(err); }
    setCompleted(true);
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F3FF" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <Sparkles size={40} color={PURPLE} />
        </motion.div>
      </div>
    );
  }

  return (
    <OnboardingGuard>
      <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #F5F3FF 0%, #fff 30%, #fff 70%, #F5F3FF 100%)", position: "relative" }}>
        <FloatingParticles />

        {/* Subtle mesh gradient background */}
        <div style={{
          position: "fixed",
          inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(91,63,248,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(167,139,250,0.05) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            <h1 style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              ...gradientText,
              margin: 0,
            }}>
              Karzalay
            </h1>
          </motion.div>

          {/* Stepper */}
          {!completed && <Stepper currentStep={gate} role={role} />}

          {/* Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                style={{
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: 12,
                  padding: "0.75rem 1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#DC2626",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {/* ─── COMPLETED ─── */}
            {completed ? (
              <GlassCard key="completed">
                <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${GREEN_SOFT}, #fff)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 1.5rem",
                    }}
                  >
                    <CheckCircle2 size={44} color={GREEN} />
                  </motion.div>
                  <Eyebrow>All Set</Eyebrow>
                  <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: "0 0 0.5rem" }}>
                    Welcome to Karzalay!
                  </h2>
                  <p style={{ fontSize: "0.9rem", color: INK_LIGHT, margin: "0 0 2rem", lineHeight: 1.6 }}>
                    You're all set up and ready to ship. Your dashboard awaits — track sprints, submit standups, and build your verifiable credential.
                  </p>
                  <motion.button
                    onClick={() => router.push("/dashboard")}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: "0.9rem 2.5rem",
                      borderRadius: 12,
                      border: "none",
                      background: gradientBg,
                      color: "#fff",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      fontFamily: "inherit",
                      cursor: "pointer",
                      boxShadow: "0 6px 20px rgba(91,63,248,0.38)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    Go to Dashboard <ArrowRight size={18} />
                  </motion.button>
                </div>
              </GlassCard>
            ) : gate === 1 ? (
              /* ═══════ GATE 1: PROFILE ═══════ */
              <GlassCard key="gate1">
                <Eyebrow>Step 1 of 3</Eyebrow>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: "0 0 0.25rem" }}>
                  Complete your profile
                </h2>
                <p style={{ fontSize: "0.85rem", color: INK_LIGHT, margin: "0 0 1.75rem" }}>
                  Let's set up your identity on Karzalay. This helps us track your contributions and build your credential.
                </p>

                <form onSubmit={handleGate1Submit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: INK_MID, marginBottom: "0.4rem" }}>
                      Full Name
                    </label>
                    <KzInput value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" icon={User} />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: INK_MID, marginBottom: "0.6rem" }}>
                      Choose your role
                    </label>
                    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                      <RoleCard
                        role="MEMBER"
                        selected={role === "MEMBER"}
                        onClick={() => setRole("MEMBER")}
                        icon={Briefcase}
                        title="Member"
                        description="Join a simulated company, work on real projects, and earn credentials."
                        features={["Join existing companies", "Work in sprints", "Earn verified credentials"]}
                      />
                      <RoleCard
                        role="LEAD"
                        selected={role === "LEAD"}
                        onClick={() => setRole("LEAD")}
                        icon={Crown}
                        title="Lead"
                        description="Create and manage your own simulated company, recruit members, and lead sprints."
                        features={["Create your company", "Recruit team members", "Manage sprints & approvals"]}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: INK_MID, marginBottom: "0.4rem" }}>
                      Globe Username <span style={{ color: PURPLE }}>*</span>
                    </label>
                    <KzInput value={Globe} onChange={e => setGithub(e.target.value)} placeholder="octocat" icon={Globe} required />
                    <p style={{ fontSize: "0.75rem", color: INK_LIGHT, margin: "0.35rem 0 0" }}>
                      Required for commit tracking and your verifiable credential.
                    </p>
                  </div>

                  <div style={{ marginTop: "0.5rem" }}>
                    <KzButton type="submit" loading={actionLoading}>
                      Continue <ArrowRight size={18} />
                    </KzButton>
                  </div>
                </form>
              </GlassCard>

            ) : gate === 2 ? (
              /* ═══════ GATE 2: CHOOSE PATH ═══════ */
              <GlassCard key="gate2">
                <Eyebrow>Step 2 of 3</Eyebrow>
                {role === "LEAD" ? (
                  <>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: "0 0 0.25rem" }}>
                      Create your Startup
                    </h2>
                    <p style={{ fontSize: "0.85rem", color: INK_LIGHT, margin: "0 0 1.75rem" }}>
                      Set up your company workspace to start managing your team and shipping products.
                    </p>
                    <form onSubmit={handleCreateStartup} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div>
                        <label style={{ fontSize: "0.85rem", fontWeight: 600, color: INK_MID }}>Startup Name</label>
                        <KzInput value={startupName} onChange={e => setStartupName(e.target.value)} placeholder="Acme Corp" icon={Building2} required />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.85rem", fontWeight: 600, color: INK_MID }}>City / Region</label>
                        <KzInput value={startupCity} onChange={e => setStartupCity(e.target.value)} placeholder="Mumbai, India" icon={MapPin} required />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.85rem", fontWeight: 600, color: INK_MID }}>Documentation Link</label>
                        <KzInput value={startupDocUrl} onChange={e => setStartupDocUrl(e.target.value)} placeholder="https://notion.so/..." icon={LinkIcon} required />
                        <p style={{ fontSize: "0.75rem", color: INK_LIGHT, marginTop: "0.35rem" }}>
                          Link to your pitch deck, Notion workspace, or company website.
                        </p>
                      </div>
                      <KzButton type="submit" loading={actionLoading}>
                        <Rocket size={18} /> Create Startup
                      </KzButton>
                    </form>
                  </>
                ) : (
                  <>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: "0 0 0.25rem" }}>
                      Join a Company
                    </h2>
                    <p style={{ fontSize: "0.85rem", color: INK_LIGHT, margin: "0 0 1.5rem" }}>
                      Browse simulated companies across India. Apply to one that matches your interests.
                    </p>

                    {applicationSent ? (
                      <WaitingState onSimulate={async () => {
                        await fetch("/api/dev/approve-application", { method: "POST" });
                        setGate(3);
                      }} />
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {companies.length > 0 ? (
                          companies.map(c => (
                            <CompanyCard key={c.id} company={c} onApply={handleApply} applying={actionLoading} />
                          ))
                        ) : (
                          <div style={{ textAlign: "center", padding: "3rem 1rem", color: INK_LIGHT }}>
                            <Building2 size={40} style={{ margin: "0 auto 0.75rem", opacity: 0.4 }} />
                            <p style={{ fontSize: "0.9rem", fontWeight: 600, color: INK_MID, margin: "0 0 0.25rem" }}>No companies available</p>
                            <p style={{ fontSize: "0.8rem", margin: 0 }}>Check back soon — new companies are launching weekly.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </GlassCard>

            ) : gate === 3 ? (
              /* ═══════ GATE 3: GET STARTED ═══════ */
              <GlassCard key="gate3">
                <Eyebrow>Step 3 of 3</Eyebrow>
                {role === "LEAD" ? (
                  <>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: "0 0 0.25rem" }}>
                      Invite your Team
                    </h2>
                    <p style={{ fontSize: "0.85rem", color: INK_LIGHT, margin: "0 0 1.75rem" }}>
                      Your workspace is ready. Share this invite link with potential team members.
                    </p>

                    <div style={{
                      padding: "1.5rem",
                      background: PURPLE_XSOFT,
                      border: `1.5px dashed ${PURPLE_SOFT}`,
                      borderRadius: 16,
                      marginBottom: "1.5rem",
                      textAlign: "center",
                    }}>
                      <Users size={32} color={PURPLE} style={{ margin: "0 auto 0.75rem" }} />
                      <p style={{ fontWeight: 700, fontSize: "0.9rem", color: INK, margin: "0 0 0.5rem" }}>
                        Share this Invite Link
                      </p>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        justifyContent: "center",
                        marginBottom: "0.75rem",
                      }}>
                        <code style={{
                          fontSize: "0.8rem",
                          color: PURPLE,
                          background: "rgba(91,63,248,0.08)",
                          padding: "0.4rem 0.75rem",
                          borderRadius: 8,
                          fontFamily: "monospace",
                        }}>
                          https://karzalay.app/join/acme-corp-123
                        </code>
                      </div>
                      <motion.button
                        onClick={handleCopyLink}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          padding: "0.5rem 1.25rem",
                          borderRadius: 8,
                          border: `1.5px solid ${PURPLE_SOFT}`,
                          background: copied ? GREEN_SOFT : "#fff",
                          color: copied ? GREEN : PURPLE,
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          fontFamily: "inherit",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy Link</>}
                      </motion.button>
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                      <KzButton variant="secondary" onClick={handleSkipInvite} style={{ flex: 1 }}>
                        Skip for now
                      </KzButton>
                      <KzButton onClick={handleSkipInvite} style={{ flex: 1 }}>
                        Continue <ArrowRight size={18} />
                      </KzButton>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: "0 0 0.25rem" }}>
                      Your First Standup
                    </h2>
                    <p style={{ fontSize: "0.85rem", color: INK_LIGHT, margin: "0 0 1.75rem" }}>
                      Daily standups are the heartbeat of Karzalay. Share what you're working on — this builds your work history.
                    </p>

                    <form onSubmit={handleGate3Submit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <KzTextarea
                        label="What did you do yesterday?"
                        value={yesterday}
                        onChange={e => setYesterday(e.target.value)}
                        placeholder="e.g., Set up the project repo, designed the auth flow..."
                        required
                        rows={3}
                      />
                      <KzTextarea
                        label="What will you do today?"
                        value={today}
                        onChange={e => setToday(e.target.value)}
                        placeholder="e.g., Build the login page, integrate the API..."
                        required
                        rows={3}
                      />
                      <KzTextarea
                        label="Any blockers?"
                        value={blockers}
                        onChange={e => setBlockers(e.target.value)}
                        placeholder="None — or describe what's blocking you..."
                        rows={2}
                      />

                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.75rem 1rem",
                        background: PURPLE_XSOFT,
                        borderRadius: 10,
                        fontSize: "0.78rem",
                        color: INK_MID,
                      }}>
                        <Shield size={15} color={PURPLE} />
                        Your standup is recorded and contributes to your verifiable credential.
                      </div>

                      <KzButton type="submit" loading={actionLoading}>
                        <CheckCircle2 size={18} /> Submit Standup
                      </KzButton>
                    </form>
                  </>
                )}
              </GlassCard>
            ) : null}
          </AnimatePresence>

          {/* Footer hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              textAlign: "center",
              fontSize: "0.75rem",
              color: INK_LIGHT,
              marginTop: "2rem",
              opacity: 0.6,
            }}
          >
            Step {gate} of 3 · You can complete this in under 2 minutes
          </motion.p>
        </div>
      </div>
    </OnboardingGuard>
  );
}
