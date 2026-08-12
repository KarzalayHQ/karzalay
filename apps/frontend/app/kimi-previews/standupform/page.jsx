"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Send,
  Loader2,
  Timer,
  Shield,
  Sparkles,
  Calendar,
  Sun,
  Moon,
  Flame
} from "lucide-react";

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
const ORANGE = "#EA580C";
const ORANGE_SOFT = "#FFF7ED";
const RED = "#DC2626";
const RED_SOFT = "#FEF2F2";
const BLUE = "#2563EB";
const BLUE_SOFT = "#EFF6FF";

const gradientText = {
  background: "linear-gradient(135deg, #5B3FF8 0%, #8B5CF6 50%, #A78BFA 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};
const gradientBg = "linear-gradient(135deg, #5B3FF8 0%, #8B5CF6 50%, #A78BFA 100%)";
const cardShadow = "0 2px 12px rgba(91,63,248,0.07)";
const cardShadowHover = "0 16px 40px rgba(91,63,248,0.13)";

/* ─── Time Helper ─── */
function getISTStatus() {
  const now = new Date();
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const hours = ist.getHours();
  const minutes = ist.getMinutes();
  const timeVal = hours * 60 + minutes;
  const windowStart = 9 * 60 + 30;  // 9:30 AM
  const windowEnd = 10 * 60 + 30;   // 10:30 AM

  const isInWindow = timeVal >= windowStart && timeVal <= windowEnd;
  const timeLeft = windowEnd - timeVal;
  const hoursLeft = Math.floor(timeLeft / 60);
  const minsLeft = timeVal < windowStart ? Math.floor((windowStart - timeVal) % 60) : Math.floor(timeLeft % 60);

  return {
    isInWindow,
    isBeforeWindow: timeVal < windowStart,
    isAfterWindow: timeVal > windowEnd,
    timeString: `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`,
    hoursLeft,
    minsLeft,
    nextWindow: `${Math.floor(windowStart / 60).toString().padStart(2, "0")}:${(windowStart % 60).toString().padStart(2, "0")}`,
  };
}

function Eyebrow({ children }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", ...gradientText, margin: 0 }}>
      {children}
    </p>
  );
}

function GlassCard({ children, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 2 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        background: "#fff",
        borderRadius: 20,
        border: "1px solid rgba(91,63,248,0.12)",
        boxShadow: cardShadow,
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        maxWidth: 640,
        margin: "0 auto",
        ...style,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: gradientBg }} />
      {children}
    </motion.div>
  );
}

function KzTextarea({ value, onChange, placeholder, required = false, rows = 4, label, icon: Icon, disabled = false }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 700, color: INK_MID, marginBottom: "0.5rem" }}>
        {Icon && <Icon size={15} color={PURPLE} />}
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "0.875rem 1rem",
          borderRadius: 12,
          border: `1.5px solid ${focused ? PURPLE : "rgba(91,63,248,0.15)"}`,
          background: disabled ? "#F3F4F6" : focused ? "#FAF8FF" : "#F8F7FC",
          color: disabled ? INK_LIGHT : INK,
          fontSize: "0.9rem",
          fontFamily: "inherit",
          outline: "none",
          resize: "vertical",
          minHeight: 90,
          transition: "all 0.2s ease",
          boxSizing: "border-box",
          lineHeight: 1.6,
          cursor: disabled ? "not-allowed" : "text",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   STANDUP FORM
   ═══════════════════════════════════════════ */
export default function StandupForm() {
  const router = useRouter();
  const [yesterday, setYesterday] = useState("");
  const [today, setToday] = useState("");
  const [blockers, setBlockers] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [timeStatus, setTimeStatus] = useState(getISTStatus());
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  // Update timer every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const status = getISTStatus();
      setTimeStatus(status);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Check if already submitted today
  useEffect(() => {
    const checkSubmitted = async () => {
      try {
        const res = await fetch("/api/standups", { credentials: "include" });
        if (res.ok) {
          setAlreadySubmitted(true);
        }
      } catch (e) {
        // Not submitted yet
      }
    };
    checkSubmitted();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!timeStatus.isInWindow) { setError("Standup window is closed. Submit between 9:30-10:30 AM IST."); return; }
    if (!yesterday.trim() || !today.trim()) { setError("Please fill in both yesterday and today fields."); return; }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/standups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ yesterday, today, blockers }),
        credentials: "include",
      });
      if (res.status === 201) {
        setSubmitted(true);
      } else if (res.status === 400) {
        setAlreadySubmitted(true);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── STATE: Already Submitted ───
  if (alreadySubmitted) {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1rem" }}>
        <GlassCard>
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              style={{
                width: 80, height: 80, borderRadius: "50%",
                background: GREEN_SOFT,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <CheckCircle2 size={40} color={GREEN} />
            </motion.div>
            <Eyebrow>Already Submitted</Eyebrow>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: INK, margin: "0.5rem 0 0.5rem" }}>
              Standup Complete
            </h2>
            <p style={{ fontSize: "0.85rem", color: INK_LIGHT, margin: "0 0 1.5rem", lineHeight: 1.6 }}>
              You've already submitted your standup for today. Come back tomorrow at 9:30 AM IST.
            </p>
            <motion.button
              onClick={() => router.push("/dashboard")}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: "0.8rem 1.5rem",
                borderRadius: 12,
                border: "none",
                background: gradientBg,
                color: "#fff",
                fontSize: "0.9rem",
                fontWeight: 700,
                fontFamily: "inherit",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(91,63,248,0.38)",
              }}
            >
              Go to Dashboard
            </motion.button>
          </div>
        </GlassCard>
      </div>
    );
  }

  // ─── STATE: Success ───
  if (submitted) {
    return (
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1rem" }}>
        <GlassCard>
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              style={{
                width: 90, height: 90, borderRadius: "50%",
                background: `linear-gradient(135deg, ${GREEN_SOFT}, #fff)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <CheckCircle2 size={44} color={GREEN} />
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                padding: "0.35rem 0.875rem", borderRadius: 999,
                background: GREEN_SOFT, marginBottom: "0.75rem",
              }}>
                <Sparkles size={13} color={GREEN} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: GREEN }}>Standup Submitted</span>
              </div>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              style={{ fontSize: "1.5rem", fontWeight: 800, color: INK, margin: "0 0 0.5rem" }}>
              Great work today!
            </motion.h2>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ fontSize: "0.85rem", color: INK_LIGHT, margin: "0 0 0.5rem" }}>
              Your standup for <strong style={{ color: INK_MID }}>{new Date().toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" })}</strong> has been recorded.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 1rem", borderRadius: 10,
                background: PURPLE_XSOFT, marginBottom: "1.5rem",
                fontSize: "0.8rem", color: INK_MID, fontWeight: 600,
              }}>
              <Shield size={14} color={PURPLE} />
              This contributes to your verifiable credential
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <motion.button
                onClick={() => router.push("/dashboard")}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: "0.8rem 1.5rem",
                  borderRadius: 12,
                  border: "none",
                  background: gradientBg,
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(91,63,248,0.38)",
                }}
              >
                Back to Dashboard
              </motion.button>
            </motion.div>
          </div>
        </GlassCard>
      </div>
    );
  }

  // ─── MAIN FORM ───
  const isBlocked = !timeStatus.isInWindow;

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Back button */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: "1.5rem" }}>
        <button
          onClick={() => router.push("/dashboard")}
          style={{
            display: "flex", alignItems: "center", gap: "0.35rem",
            background: "none", border: "none",
            color: INK_LIGHT, fontSize: "0.85rem", fontWeight: 600,
            fontFamily: "inherit", cursor: "pointer",
          }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </motion.div>

      <GlassCard style={{ opacity: isBlocked ? 0.7 : 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <Eyebrow>Daily Standup</Eyebrow>
            <span style={{
              padding: "0.2rem 0.5rem", borderRadius: 6,
              background: timeStatus.isInWindow ? GREEN_SOFT : ORANGE_SOFT,
              fontSize: "0.7rem", fontWeight: 700,
              color: timeStatus.isInWindow ? GREEN : ORANGE,
            }}>
              {timeStatus.isInWindow ? "Window Open" : timeStatus.isBeforeWindow ? "Upcoming" : "Closed"}
            </span>
          </div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: "0 0 0.25rem" }}>
            What did you work on?
          </h2>
          <p style={{ fontSize: "0.8rem", color: INK_LIGHT, margin: 0 }}>
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Time Window Banner */}
        <div style={{
          padding: "0.75rem 1rem",
          borderRadius: 12,
          background: timeStatus.isInWindow ? GREEN_SOFT : timeStatus.isBeforeWindow ? BLUE_SOFT : RED_SOFT,
          border: `1px solid ${timeStatus.isInWindow ? "rgba(22,163,74,0.15)" : timeStatus.isBeforeWindow ? "rgba(59,130,246,0.15)" : "rgba(220,38,38,0.15)"}`,
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
        }}>
          {timeStatus.isInWindow ? (
            <>
              <Clock size={18} color={GREEN} />
              <div>
                <p style={{ fontSize: "0.8rem", fontWeight: 700, color: GREEN, margin: "0 0 0.05rem" }}>Standup window is open</p>
                <p style={{ fontSize: "0.72rem", color: INK_MID, margin: 0 }}>You have until 10:30 AM IST to submit</p>
              </div>
            </>
          ) : timeStatus.isBeforeWindow ? (
            <>
              <Timer size={18} color={BLUE} />
              <div>
                <p style={{ fontSize: "0.8rem", fontWeight: 700, color: BLUE, margin: "0 0 0.05rem" }}>Window opens at 9:30 AM IST</p>
                <p style={{ fontSize: "0.72rem", color: INK_MID, margin: 0 }}>Come back in {timeStatus.hoursLeft}h {timeStatus.minsLeft}m</p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle size={18} color={RED} />
              <div>
                <p style={{ fontSize: "0.8rem", fontWeight: 700, color: RED, margin: "0 0 0.05rem" }}>Standup window closed at 10:30 AM IST</p>
                <p style={{ fontSize: "0.72rem", color: INK_MID, margin: 0 }}>You missed today's window. See you tomorrow!</p>
              </div>
            </>
          )}
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              style={{
                background: RED_SOFT,
                border: "1px solid rgba(220,38,38,0.15)",
                borderRadius: 10,
                padding: "0.65rem 0.875rem",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: RED,
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              <AlertCircle size={15} /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <KzTextarea
            label="What did you do yesterday?"
            value={yesterday}
            onChange={e => setYesterday(e.target.value)}
            placeholder="e.g., Completed the auth flow redesign, reviewed 3 PRs from teammates..."
            required
            rows={3}
            icon={Clock}
            disabled={isBlocked}
          />

          <KzTextarea
            label="What will you do today?"
            value={today}
            onChange={e => setToday(e.target.value)}
            placeholder="e.g., Start building the dashboard analytics widget, attend design review..."
            required
            rows={3}
            icon={Sun}
            disabled={isBlocked}
          />

          <KzTextarea
            label="Any blockers?"
            value={blockers}
            onChange={e => setBlockers(e.target.value)}
            placeholder="None — or describe anything blocking your progress..."
            rows={2}
            icon={AlertCircle}
            disabled={isBlocked}
          />

          {/* Info box */}
          <div style={{
            padding: "0.75rem 1rem",
            borderRadius: 10,
            background: PURPLE_XSOFT,
            display: "flex",
            alignItems: "flex-start",
            gap: "0.5rem",
            fontSize: "0.78rem",
            color: INK_MID,
            fontWeight: 500,
          }}>
            <Shield size={15} color={PURPLE} style={{ marginTop: 2, flexShrink: 0 }} />
            Your standup is recorded and contributes to your verifiable credential. Be specific — it matters.
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading || isBlocked}
            whileHover={isBlocked ? {} : { scale: 1.01, y: -1 }}
            whileTap={isBlocked ? {} : { scale: 0.99 }}
            style={{
              width: "100%",
              padding: "0.9rem",
              borderRadius: 12,
              border: "none",
              background: isBlocked ? "#E5E7EB" : gradientBg,
              color: isBlocked ? INK_LIGHT : "#fff",
              fontSize: "0.95rem",
              fontWeight: 700,
              fontFamily: "inherit",
              cursor: isBlocked ? "not-allowed" : loading ? "wait" : "pointer",
              opacity: isBlocked ? 0.6 : loading ? 0.7 : 1,
              boxShadow: isBlocked ? "none" : "0 6px 20px rgba(91,63,248,0.38)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "0.25rem",
            }}
          >
            {loading ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <>
              <Send size={18} /> Submit Standup
            </>}
          </motion.button>
        </form>
      </GlassCard>

      {/* Footer tip */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ textAlign: "center", fontSize: "0.75rem", color: INK_LIGHT, marginTop: "1.5rem", opacity: 0.6 }}
      >
        Standup window: 9:30 AM — 10:30 AM IST daily
      </motion.p>
    </div>
  );
}
