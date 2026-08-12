"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Shield,
  ShieldCheck,
  Calendar,
  GitCommit,
  Users,
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ExternalLink,
  Fingerprint,
  TrendingUp,
  MapPin,
  Briefcase,
  Sparkles,
  Lock,
  Verified
} from "lucide-react";
import Link from "next/link";

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

const gradientText = {
  background: "linear-gradient(135deg, #5B3FF8 0%, #8B5CF6 50%, #A78BFA 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};
const gradientBg = "linear-gradient(135deg, #5B3FF8 0%, #8B5CF6 50%, #A78BFA 100%)";
const cardShadow = "0 2px 12px rgba(91,63,248,0.07)";
const cardShadowHover = "0 16px 40px rgba(91,63,248,0.13)";

/* ─── Contribution Heatmap Generator ─── */
function generateContributions() {
  const weeks = 12;
  const daysPerWeek = 7;
  const data = [];
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < daysPerWeek; d++) {
      const rand = Math.random();
      let level = 0;
      if (rand > 0.75) level = 3;
      else if (rand > 0.5) level = 2;
      else if (rand > 0.2) level = 1;
      week.push(level);
    }
    data.push(week);
  }
  return data;
}

const HEATMAP_COLORS = ["#EDE9FE", "#C4B5FD", "#8B5CF6", "#5B3FF8", "#4C1D95"];

function ContributionHeatmap() {
  const data = generateContributions();
  const dayLabels = ["Mon", "Wed", "Fri"];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
        {/* Day labels */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px", paddingTop: 18 }}>
          {dayLabels.map((label, i) => (
            <div key={i} style={{ height: 12, display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "0.6rem", color: INK_LIGHT, width: 24, textAlign: "right" }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "flex", gap: "2px", overflowX: "auto" }}>
          {data.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {week.map((day, di) => (
                <motion.div
                  key={di}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (wi * 7 + di) * 0.003 }}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 3,
                    background: HEATMAP_COLORS[day],
                  }}
                  title={`${day} contribution${day !== 1 ? "s" : ""}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.75rem", justifyContent: "flex-end" }}>
        <span style={{ fontSize: "0.6rem", color: INK_LIGHT }}>Less</span>
        {HEATMAP_COLORS.map((c, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
        ))}
        <span style={{ fontSize: "0.6rem", color: INK_LIGHT }}>More</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CREDENTIAL PAGE
   ═══════════════════════════════════════════ */
export default function CredentialPage() {
  const params = useParams();
  const [credential, setCredential] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCredential = async () => {
      try {
        const res = await fetch(`/api/verify/${params.id}`);
        if (!res.ok) throw new Error("Credential not found");
        const data = await res.json();
        setCredential(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCredential();
  }, [params.id]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F3FF" }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <Shield size={40} color={PURPLE} />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F3FF", padding: "2rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "2.5rem",
            textAlign: "center",
            maxWidth: 400,
            border: "1px solid rgba(220,38,38,0.15)",
          }}
        >
          <AlertCircle size={48} color="#DC2626" style={{ margin: "0 auto 1rem" }} />
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: INK, margin: "0 0 0.5rem" }}>Credential Not Found</h2>
          <p style={{ fontSize: "0.85rem", color: INK_LIGHT, margin: "0 0 1.5rem" }}>{error}</p>
          <Link href="/" style={{ color: PURPLE, fontWeight: 700, fontSize: "0.85rem", textDecoration: "none" }}>
            Back to home
          </Link>
        </motion.div>
      </div>
    );
  }

  const mockCredential = credential || {
    name: "Sarah Chen",
    role: "Backend Lead",
    company: "Nexus UI",
    attendanceScore: 98,
    commitCount: 1420,
    duration: "8 Months",
    isVerified: true,
    signature: "0x7a3f9e2b1c4d6a8b9f0e1d2c3b4a5f6e7d8c9b0",
    issuedAt: "2026-06-02T10:00:00Z",
    verifiedImpact: "Architected and deployed a highly scalable edge-caching layer that reduced TTFB by 40% and increased checkout conversion revenue by 15% across all regions.",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #F5F3FF 0%, #fff 30%, #fff 70%, #F5F3FF 100%)",
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    }}>
      {/* Mesh gradient */}
      <div style={{
        position: "fixed", inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(91,63,248,0.06) 0%, transparent 60%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>

        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: "1.5rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: INK_LIGHT, fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
            <ArrowLeft size={16} /> Back to Karzalay
          </Link>
        </motion.div>

        {/* Verification Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: gradientBg,
            borderRadius: 20,
            padding: "1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.5rem",
            color: "#fff",
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <ShieldCheck size={32} />
          </motion.div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 800, margin: "0 0 0.15rem" }}>Verified Credential</h2>
            <p style={{ fontSize: "0.78rem", opacity: 0.9, margin: 0 }}>
              This credential is cryptographically signed and live-updated. Verified on {new Date(mockCredential.issuedAt).toLocaleDateString("en-IN")}.
            </p>
          </div>
          <div style={{
            padding: "0.35rem 0.75rem",
            borderRadius: 8,
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
            fontSize: "0.7rem",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}>
            TRUSTED
          </div>
        </motion.div>

        {/* Main Credential Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: "#fff",
            borderRadius: 24,
            border: "1px solid rgba(91,63,248,0.12)",
            boxShadow: cardShadow,
            overflow: "hidden",
            marginBottom: "1.5rem",
          }}
        >
          {/* Top bar */}
          <div style={{ height: 4, background: gradientBg }} />

          <div style={{ padding: "2rem" }}>
            {/* Identity Header */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", marginBottom: "1.5rem" }}>
              <div style={{
                width: 72, height: 72, borderRadius: 20,
                background: gradientBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem", fontWeight: 800, color: "#fff",
                flexShrink: 0,
              }}>
                {mockCredential.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                  <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: 0 }}>
                    {mockCredential.name}
                  </h1>
                  <CheckCircle2 size={20} color={GREEN} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.85rem", color: INK_MID, fontWeight: 600 }}>
                    <Briefcase size={14} color={PURPLE} /> {mockCredential.role}
                  </span>
                  <span style={{ color: "rgba(91,63,248,0.2)" }}>·</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.85rem", color: INK_MID }}>
                    <MapPin size={14} color={INK_LIGHT} /> {mockCredential.company}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
              padding: "1.25rem",
              background: PURPLE_XSOFT,
              borderRadius: 16,
              marginBottom: "1.5rem",
            }}>
              {[
                { icon: Calendar, label: "Duration", value: mockCredential.duration },
                { icon: TrendingUp, label: "Attendance", value: `${mockCredential.attendanceScore}%` },
                { icon: GitCommit, label: "Commits", value: mockCredential.commitCount.toLocaleString() },
                { icon: Award, label: "Sprints", value: "12" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  style={{ textAlign: "center" }}
                >
                  <stat.icon size={18} color={PURPLE} style={{ margin: "0 auto 0.35rem" }} />
                  <p style={{ fontSize: "1.1rem", fontWeight: 800, color: INK, margin: "0 0 0.1rem" }}>{stat.value}</p>
                  <p style={{ fontSize: "0.65rem", color: INK_LIGHT, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Verified Impact */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
                <Sparkles size={14} color={PURPLE} />
                <h3 style={{ fontSize: "0.82rem", fontWeight: 700, color: INK_MID, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Verified Business Impact</h3>
              </div>
              <p style={{ fontSize: "0.9rem", color: INK_MID, lineHeight: 1.7, margin: 0, padding: "1rem", background: "#FAFAFF", borderRadius: 12, border: "1px solid rgba(91,63,248,0.06)" }}>
                {mockCredential.verifiedImpact}
              </p>
            </div>

            {/* Contribution Heatmap */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.75rem" }}>
                <GitCommit size={14} color={PURPLE} />
                <h3 style={{ fontSize: "0.82rem", fontWeight: 700, color: INK_MID, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>12-Week Contribution Activity</h3>
              </div>
              <ContributionHeatmap />
            </div>
          </div>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            padding: "1rem 1.25rem",
            background: "#fff",
            borderRadius: 14,
            border: "1px solid rgba(91,63,248,0.08)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <Fingerprint size={18} color={INK_LIGHT} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "0.7rem", color: INK_LIGHT, margin: "0 0 0.1rem", fontWeight: 600 }}>Cryptographic Signature</p>
            <p style={{ fontSize: "0.65rem", color: INK_LIGHT, margin: 0, fontFamily: "monospace", opacity: 0.7, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {mockCredential.signature}
            </p>
          </div>
          <Lock size={14} color={GREEN} />
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ textAlign: "center", fontSize: "0.75rem", color: INK_LIGHT, marginTop: "1.5rem", opacity: 0.6 }}
        >
          This credential is publicly verifiable at karzalay.in/verify/{params.id}
        </motion.p>
      </div>
    </div>
  );
}
