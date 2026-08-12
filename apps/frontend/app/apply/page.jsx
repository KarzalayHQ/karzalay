"use client";

/* ═══════════════════════════════════════════
 * File: app/apply/page.jsx
 * Purpose: Handles the user application flow to join specific startup cohorts.
 * Design Decisions:
 * - Reuses much of the visual logic from onboarding (Stepper, GlassCard) for consistency.
 * - Relies heavily on conditional rendering based on the current 'gate' state.
 * Tokens Used:
 * - Similar to onboarding, uses PURPLE gradients for active buttons and selection borders.
 * Component Connections:
 * - Communicates with Socket.io for real-time approval updates from the Lead.
 * - Posts application data to /api/applications.
 * ═══════════════════════════════════════════ */

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  AlertCircle,
  Search,
  ArrowLeft
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
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
  { num: 1, label: "Details", icon: User, desc: "Your info" },
  { num: 2, label: "Apply", icon: Building2, desc: "Join company" },
  { num: 3, label: "Finish", icon: CheckCircle2, desc: "Done" },
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
      className="kz-glass-card"
      style={{
        background: "#fff",
        borderRadius: 20,
        border: "1px solid rgba(91,63,248,0.12)",
        boxShadow: cardShadow,
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
function ApplyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, fetchUser } = useAuth();

  const [gate, setGate] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // Gate 1
  const [name, setName] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [github, setGithub] = useState("");

  // Gate 2
  const [companies, setCompanies] = useState([]);
  const [applicationSent, setApplicationSent] = useState(false);
  const [socket, setSocket] = useState(null);

  // Gate 2 Lead
  const [startupName, setStartupName] = useState("");
  const [startupCity, setStartupCity] = useState("");
  const [startupDocUrl, setStartupDocUrl] = useState("");
  const [startupApplied, setStartupApplied] = useState(false);

  // Gate 3 Member
  const [yesterday, setYesterday] = useState("");
  const [today, setToday] = useState("");
  const [blockers, setBlockers] = useState("");

  // Completion
  const [completed, setCompleted] = useState(false);

  // Clipboard
  const [copied, setCopied] = useState(false);

  // Gate 2 Member Form State
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberResumeUrl, setMemberResumeUrl] = useState("");
  const [memberCollege, setMemberCollege] = useState("");
  const [memberQualification, setMemberQualification] = useState("");
  const [memberGraduationYear, setMemberGraduationYear] = useState("");
  const [memberGithub, setMemberGithub] = useState("");
  const [memberLeetcode, setMemberLeetcode] = useState("");
  const [memberProjectLinks, setMemberProjectLinks] = useState("");
  const [memberAchievements, setMemberAchievements] = useState("");
  const [memberSkills, setMemberSkills] = useState("");
  const [memberSummary, setMemberSummary] = useState("");
  
  // Past Experience
  const [hasExperience, setHasExperience] = useState(false);
  const [expCompany, setExpCompany] = useState("");
  const [expRole, setExpRole] = useState("");
  const [expDetails, setExpDetails] = useState("");

  // Gate 3 Member Form State
  const [memberCompanyId, setMemberCompanyId] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [memberReason, setMemberReason] = useState("");

  useEffect(() => {
    const initFlow = () => {
      setRole("MEMBER");
      setGate(1);
      
      const companyId = searchParams.get("company");
      const roleName = searchParams.get("role");
      
      if (companyId) setMemberCompanyId(companyId);
      if (roleName) setMemberRole(roleName);
      
      setLoading(false);
    };
    initFlow();
  }, [searchParams]);

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
      setTimeout(() => setSocket(newSocket), 0);
      return () => newSocket.disconnect();
    }
  }, [gate, role]);

  const handleGate1Submit = async (e) => {
    e.preventDefault();
    setError("");
    setActionLoading(true);
    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, githubUsername: github }),
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

  const handleGate2MemberSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setActionLoading(true);
    setTimeout(() => {
      setActionLoading(false);
      setGate(2);
    }, 400);
  };
  const handleMemberApply = async (e) => {
    e.preventDefault();
    // Bypassed validation for testing
    setError("");
    setActionLoading(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId: memberCompanyId }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Application failed");
      setApplicationSent(true);
      if (!socket || !socket.connected) {
        setTimeout(() => {
          fetch("/api/onboarding/complete", { method: "POST", credentials: "include" }).catch(console.error);
          setCompleted(true);
        }, 2000);
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
    // Bypassed validation for testing
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
      setStartupApplied(true);
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
          <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #F5F3FF 0%, #fff 30%, #fff 70%, #F5F3FF 100%)", position: "relative" }}>
        <FloatingParticles />
        
        {!completed && (
          <button 
            onClick={() => gate > 1 ? setGate(gate - 1) : router.push('/')}
            style={{
              position: "absolute",
              top: "2rem",
              left: "2rem",
              background: "rgba(255,255,255,0.8)",
              border: "1.5px solid rgba(91,63,248,0.15)",
              backdropFilter: "blur(8px)",
              padding: "0.5rem 0.85rem",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
              color: INK_MID,
              fontWeight: 700,
              fontSize: "0.85rem",
              zIndex: 10,
              boxShadow: "0 2px 10px rgba(91,63,248,0.05)",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = PURPLE; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; e.currentTarget.style.color = INK_MID; }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}

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
                    onClick={() => router.push("/")}
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
                    Go to Home <ArrowRight size={18} />
                  </motion.button>
                </div>
              </GlassCard>
            ) : gate === 1 ? (
              /* ═══════ GATE 1: YOUR DETAILS ═══════ */
              <GlassCard key="gate1">
                <Eyebrow>Step 1 of 2</Eyebrow>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: "0 0 0.25rem" }}>
                      Your Details
                    </h2>
                    <p style={{ fontSize: "0.85rem", color: INK_LIGHT, margin: "0 0 1.75rem" }}>
                      Provide your professional and educational background.
                    </p>

                    {error && <div style={{ color: "#EF4444", fontSize: "0.85rem", marginBottom: "1rem", fontWeight: 600 }}>{error}</div>}

                    <form onSubmit={handleGate2MemberSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                      <div style={{ paddingBottom: "1rem", borderBottom: `1px solid rgba(91,63,248,0.15)` }}>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: INK, marginBottom: "1rem" }}>Identity</h3>
                        <div style={{ display: "grid", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Full Name *</label>
                            <KzInput value={name} onChange={e => setName(e.target.value)} required />
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                            <div>
                              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Email *</label>
                              <KzInput value={memberEmail} onChange={e => setMemberEmail(e.target.value)} type="email" required />
                            </div>
                            <div>
                              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Phone (optional)</label>
                              <KzInput value={memberPhone} onChange={e => setMemberPhone(e.target.value)} type="tel" placeholder="+91 98765 43210" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ paddingBottom: "1rem", borderBottom: `1px solid rgba(91,63,248,0.15)` }}>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: INK, marginBottom: "1rem" }}>Portfolio & Academics</h3>
                        <div style={{ display: "grid", gap: "1rem" }}>
                          <div>
                            <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Resume / Portfolio URL *</label>
                            <KzInput value={memberResumeUrl} onChange={e => setMemberResumeUrl(e.target.value)} placeholder="https://..." icon={LinkIcon} required />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>College / University *</label>
                            <KzInput value={memberCollege} onChange={e => setMemberCollege(e.target.value)} placeholder="e.g. Stanford University" icon={Building2} required />
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                            <div>
                              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Current Qualification *</label>
                              <KzInput value={memberQualification} onChange={e => setMemberQualification(e.target.value)} placeholder="e.g. B.Tech CS" icon={FileText} required />
                            </div>
                            <div>
                              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Graduation Year *</label>
                              <KzInput value={memberGraduationYear} onChange={e => setMemberGraduationYear(e.target.value)} placeholder="e.g. 2024" required />
                            </div>
                          </div>
                          <div>
                            <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Deployment / Live Project Links</label>
                            <KzTextarea value={memberProjectLinks} onChange={e => setMemberProjectLinks(e.target.value)} placeholder="Share links to any projects you have deployed..." rows={2} />
                          </div>
                        </div>
                      </div>

                      <div style={{ paddingBottom: "1rem", borderBottom: `1px solid rgba(91,63,248,0.15)` }}>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: INK, marginBottom: "1rem" }}>Tech Profiles & Skills</h3>
                        <div style={{ display: "grid", gap: "1rem" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                            <div>
                              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>GitHub Profile (optional)</label>
                              <KzInput value={memberGithub} onChange={e => setMemberGithub(e.target.value)} placeholder="github.com/..." />
                            </div>
                            <div>
                              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>LeetCode Profile (optional)</label>
                              <KzInput value={memberLeetcode} onChange={e => setMemberLeetcode(e.target.value)} placeholder="leetcode.com/..." />
                            </div>
                          </div>
                          <div>
                            <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Skills (comma separated)</label>
                            <KzInput value={memberSkills} onChange={e => setMemberSkills(e.target.value)} placeholder="React, Node.js, Python, Figma..." />
                          </div>
                          <div>
                            <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Achievements / Certifications</label>
                            <KzTextarea value={memberAchievements} onChange={e => setMemberAchievements(e.target.value)} placeholder="List any notable achievements, hackathons, or certifications..." rows={2} />
                          </div>
                        </div>
                      </div>

                      <div style={{ paddingBottom: "1rem", borderBottom: `1px solid rgba(91,63,248,0.15)` }}>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: INK, marginBottom: "1rem" }}>Past Experience</h3>
                        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}>
                          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: INK, cursor: "pointer", fontWeight: 500 }}>
                            <input type="radio" name="experience" checked={hasExperience} onChange={() => setHasExperience(true)} style={{ accentColor: "#EA580C" }} />
                            Yes, I have experience
                          </label>
                          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: INK, cursor: "pointer", fontWeight: 500 }}>
                            <input type="radio" name="experience" checked={!hasExperience} onChange={() => {
                              setHasExperience(false);
                              setExpCompany("");
                              setExpRole("");
                              setExpDetails("");
                            }} style={{ accentColor: "#EA580C" }} />
                            No, I am a fresher
                          </label>
                        </div>

                        {hasExperience && (
                          <div style={{ display: "grid", gap: "1rem", marginTop: "1rem", padding: "1.25rem", background: "#F8F7FC", borderRadius: 12, border: "1.5px solid rgba(91,63,248,0.15)" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                              <div>
                                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Company / Org Name *</label>
                                <KzInput value={expCompany} onChange={e => setExpCompany(e.target.value)} placeholder="e.g. Acme Corp" required={hasExperience} />
                              </div>
                              <div>
                                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Role *</label>
                                <KzInput value={expRole} onChange={e => setExpRole(e.target.value)} placeholder="e.g. Frontend Intern" required={hasExperience} />
                              </div>
                            </div>
                            <div>
                              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Experience Details & Feedback</label>
                              <KzTextarea value={expDetails} onChange={e => setExpDetails(e.target.value)} placeholder="Describe what you built, what you learned, and any feedback you received..." rows={3} />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div style={{ paddingBottom: "1rem" }}>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: INK, marginBottom: "1rem" }}>Summary</h3>
                        <div>
                          <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>What else should we know about you? (Optional)</label>
                          <KzTextarea value={memberSummary} onChange={e => setMemberSummary(e.target.value)} placeholder="Tell us a bit about your passions, hobbies, or what makes you unique..." rows={3} />
                        </div>
                      </div>
                      <KzButton type="submit" loading={actionLoading} style={{ marginTop: "0.5rem" }}>
                        Continue <ArrowRight size={18} />
                      </KzButton>
                    </form>
              </GlassCard>

            ) : gate === 2 ? (
              /* ═══════ GATE 2: SELECT COMPANY ═══════ */
              <GlassCard key="gate2">
                <Eyebrow>Step 2 of 2</Eyebrow>
                    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                      <h2 style={{ fontSize: "2rem", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: "0 0 0.5rem" }}>
                        Select a company
                      </h2>
                      <p style={{ fontSize: "1rem", color: INK_LIGHT, margin: 0, fontWeight: 500 }}>
                        Apply for an open position and start working.
                      </p>
                    </div>

                    {applicationSent ? (
                      <WaitingState onSimulate={async () => {
                        await fetch("/api/onboarding/complete", { method: "POST", credentials: "include" }).catch(console.error);
                        setCompleted(true);
                      }} />
                    ) : (
                      <>
                        <div style={{ 
                          display: "flex", justifyContent: "space-between", alignItems: "center", 
                          padding: "1.25rem 1.5rem", borderRadius: 16, border: `1.5px solid rgba(91,63,248,0.15)`, 
                          background: "#fff", marginBottom: "2rem", boxShadow: "0 2px 12px rgba(91,63,248,0.04)",
                          flexWrap: "wrap", gap: "1rem"
                        }}>
                          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                            <Search size={24} color="#EA580C" />
                            <div>
                              <h4 style={{ fontWeight: 700, color: INK, fontSize: "0.95rem", margin: "0 0 0.2rem" }}>Not sure where to start?</h4>
                              <p style={{ fontSize: "0.85rem", color: INK_LIGHT, margin: 0 }}>Browse companies and find the right fit first.</p>
                            </div>
                          </div>
                          <button onClick={() => router.push('/cities')} type="button" style={{ 
                            padding: "0.6rem 1.25rem", borderRadius: 10, border: `1.5px solid rgba(91,63,248,0.2)`, 
                            background: "#fff", color: INK, fontSize: "0.85rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", transition: "all 0.2s"
                          }}>
                            Browse companies <ArrowRight size={16} />
                          </button>
                        </div>

                        <div style={{ 
                          padding: "2rem", borderRadius: 16, border: `1px solid rgba(91,63,248,0.1)`, 
                          background: "#fff", boxShadow: "0 4px 24px rgba(91,63,248,0.06)" 
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem" }}>
                            <Sparkles size={20} color="#EA580C" />
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: INK, margin: 0 }}>Select Your Role</h3>
                          </div>
                          
                          {error && <div style={{ color: "#EF4444", fontSize: "0.85rem", marginBottom: "1rem", fontWeight: 600 }}>{error}</div>}

                          <form onSubmit={handleMemberApply} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                              <div>
                                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Select a Company *</label>
                                <select 
                                  value={memberCompanyId} 
                                  onChange={e => setMemberCompanyId(e.target.value)} 
                                  required
                                  style={{ 
                                    width: "100%", padding: "0.85rem 1rem", borderRadius: 12, border: "1.5px solid rgba(91,63,248,0.15)", background: "#F8F7FC", color: INK, fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit", fontWeight: 500, appearance: "none" 
                                  }}
                                >
                                  <option value="" disabled>Choose a company...</option>
                                  {companies.map(c => <option key={c.id} value={c.id}>{c.name} — {c.city}</option>)}
                                </select>
                              </div>
                              <div>
                                <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Select a Role *</label>
                                <select 
                                  value={memberRole} 
                                  onChange={e => setMemberRole(e.target.value)} 
                                  required
                                  style={{ 
                                    width: "100%", padding: "0.85rem 1rem", borderRadius: 12, border: "1.5px solid rgba(91,63,248,0.15)", background: "#F8F7FC", color: INK, fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit", fontWeight: 500, appearance: "none" 
                                  }}
                                >
                                  <option value="" disabled>Choose a role...</option>
                                  <option value="frontend">Frontend Developer (Full-time)</option>
                                  <option value="backend">Backend Developer (Full-time)</option>
                                  <option value="designer">UI/UX Designer (Full-time)</option>
                                  <option value="pm">Product Manager (Full-time)</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label style={{ fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.4rem", display: "block" }}>Why do you want to join? *</label>
                              <KzTextarea value={memberReason} onChange={e => setMemberReason(e.target.value)} placeholder="Tell us a bit about yourself and what excites you about this company..." required />
                            </div>

                            <KzButton type="submit" loading={actionLoading} style={{ marginTop: "0.5rem" }}>
                              Finish & Join <ArrowRight size={18} />
                            </KzButton>
                          </form>
                        </div>
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
            Step {gate} of 2 · You can complete this in under 2 minutes
          </motion.p>
        </div>
      </div>
    
  );
}

export default function ApplyPage() {
  return (
    <React.Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#FAF8FF" }}>Loading...</div>}>
      <ApplyContent />
    </React.Suspense>
  );
}
