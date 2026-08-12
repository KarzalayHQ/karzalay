"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Award,
  GitCommit,
  TrendingUp,
  Users,
  Shield,
  ExternalLink,
  Search,
  ArrowUpRight,
  Sparkles,
  Crown,
  Target,
  Filter,
  ChevronRight,
  Star,
  Flame,
  Zap
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
const YELLOW = "#F59E0B";

const gradientText = {
  background: "linear-gradient(135deg, #5B3FF8 0%, #8B5CF6 50%, #A78BFA 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};
const gradientBg = "linear-gradient(135deg, #5B3FF8 0%, #8B5CF6 50%, #A78BFA 100%)";
const cardShadow = "0 2px 12px rgba(91,63,248,0.07)";

/* ─── Mock Data ─── */
const MOCK_TALENT = [
  { id: "kz-sarah-chen", name: "Sarah Chen", role: "Backend Lead", company: "Nexus UI", rank: 1, attendance: 98, commits: 1420, sprints: 12, streak: 45, signature: "0x7a3f...1b2a", trending: true },
  { id: "kz-alex-rivera", name: "Alex Rivera", role: "Frontend Architect", company: "CodeForge", rank: 2, attendance: 97, commits: 1250, sprints: 11, streak: 38, signature: "0x3b1c...4f9e", trending: true },
  { id: "kz-maria-gupta", name: "Maria Gupta", role: "Database Admin", company: "PixelPerfect", rank: 3, attendance: 95, commits: 980, sprints: 10, streak: 32, signature: "0x9a8b...2e3d", trending: false },
  { id: "kz-mike-johnson", name: "Mike Johnson", role: "Product Designer", company: "Nexus UI", rank: 4, attendance: 85, commits: 420, sprints: 8, streak: 12, signature: "0x5f6e...8c9b", trending: true },
  { id: "kz-john-doe", name: "John Doe", role: "Frontend Dev", company: "CloudSync", rank: 5, attendance: 80, commits: 300, sprints: 7, streak: 5, signature: "0x1c4d...7a3f", trending: false },
  { id: "kz-priya-sharma", name: "Priya Sharma", role: "Full Stack Dev", company: "DataWeave", rank: 6, attendance: 92, commits: 890, sprints: 9, streak: 21, signature: "0x2e3f...9a1b", trending: true },
  { id: "kz-rahul-verma", name: "Rahul Verma", role: "DevOps Engineer", company: "ServerStack", rank: 7, attendance: 88, commits: 650, sprints: 8, streak: 15, signature: "0x4a5b...6c7d", trending: false },
  { id: "kz-anita-kumar", name: "Anita Kumar", role: "UI/UX Designer", company: "AppLaunch", rank: 8, attendance: 91, commits: 340, sprints: 7, streak: 18, signature: "0x8e9f...0a1b", trending: false },
  { id: "kz-vikram-patel", name: "Vikram Patel", role: "Backend Dev", company: "CyberShield", rank: 9, attendance: 83, commits: 720, sprints: 8, streak: 8, signature: "0x1a2b...3c4d", trending: false },
  { id: "kz-neha-red", name: "Neha Reddy", role: "ML Engineer", company: "MLWorks", rank: 10, attendance: 96, commits: 1100, sprints: 10, streak: 30, signature: "0x5d6e...7f8a", trending: true },
];

/* ─── Rank Badge ─── */
function RankBadge({ rank }) {
  if (rank === 1) {
    return (
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: `linear-gradient(135deg, #F59E0B, #FBBF24)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 12px rgba(245,158,11,0.3)",
      }}>
        <Crown size={18} color="#fff" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: `linear-gradient(135deg, #9CA3AF, #D1D5DB)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 12px rgba(156,163,175,0.3)",
      }}>
        <Medal size={18} color="#fff" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: `linear-gradient(135deg, #B45309, #D97706)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 12px rgba(180,83,9,0.3)",
      }}>
        <Award size={18} color="#fff" />
      </div>
    );
  }
  return (
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      background: PURPLE_XSOFT,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "0.85rem", fontWeight: 800, color: PURPLE,
    }}>
      {rank}
    </div>
  );
}

/* ─── Attendance Bar ─── */
function AttendanceBar({ value }) {
  const color = value >= 95 ? GREEN : value >= 85 ? YELLOW : ORANGE;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#EDE9FE", overflow: "hidden", maxWidth: 80 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ height: "100%", background: color, borderRadius: 3 }}
        />
      </div>
      <span style={{ fontSize: "0.8rem", fontWeight: 700, color, minWidth: 32, textAlign: "right" }}>{value}%</span>
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", ...gradientText, margin: 0 }}>
      {children}
    </p>
  );
}

/* ═══════════════════════════════════════════
   TALENT BOARD
   ═══════════════════════════════════════════ */
export default function TalentBoard() {
  const [talent] = useState(MOCK_TALENT);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = talent.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.role.toLowerCase().includes(searchQuery.toLowerCase()) || t.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "trending" && t.trending) || (filter === "top" && t.rank <= 5);
    return matchesSearch && matchesFilter;
  });

  // Top 3 podium
  const top3 = talent.slice(0, 3);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #F5F3FF 0%, #fff 20%, #fff 80%, #F5F3FF 100%)",
      position: "relative",
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    }}>
      {/* Mesh gradient */}
      <div style={{
        position: "fixed", inset: 0,
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(91,63,248,0.06) 0%, transparent 60%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1000, margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
        >
          <Eyebrow>Talent Network</Eyebrow>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, color: INK, letterSpacing: "-0.04em", margin: "0.5rem 0 0.75rem" }}>
            Verified <span style={gradientText}>Builders</span>
          </h1>
          <p style={{ fontSize: "1rem", color: INK_MID, maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
            Discover proven talent with verifiable work history, real contributions, and earned credentials.
          </p>
        </motion.div>

        {/* Podium - Top 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "1rem", marginBottom: "2.5rem" }}
        >
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "1.5rem",
              width: 200,
              textAlign: "center",
              border: "1px solid rgba(156,163,175,0.2)",
              boxShadow: "0 4px 20px rgba(156,163,175,0.1)",
            }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: `linear-gradient(135deg, #9CA3AF, #D1D5DB)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 0.75rem",
              boxShadow: "0 4px 12px rgba(156,163,175,0.3)",
            }}>
              <Medal size={24} color="#fff" />
            </div>
            <p style={{ fontSize: "0.7rem", color: INK_LIGHT, fontWeight: 700, margin: "0 0 0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>2nd Place</p>
            <p style={{ fontSize: "1rem", fontWeight: 800, color: INK, margin: "0 0 0.15rem" }}>{top3[1].name}</p>
            <p style={{ fontSize: "0.78rem", color: INK_LIGHT, margin: "0 0 0.5rem" }}>{top3[1].role}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: PURPLE }}>{top3[1].commits} commits</span>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: "2rem 1.5rem",
              width: 220,
              textAlign: "center",
              border: "2px solid rgba(245,158,11,0.3)",
              boxShadow: "0 8px 32px rgba(245,158,11,0.15)",
              position: "relative",
            }}
          >
            <div style={{
              position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
              padding: "0.25rem 0.75rem", borderRadius: 999,
              background: `linear-gradient(135deg, #F59E0B, #FBBF24)`,
              fontSize: "0.65rem", fontWeight: 800, color: "#fff",
            }}>
              CHAMPION
            </div>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: `linear-gradient(135deg, #F59E0B, #FBBF24)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 0.75rem",
              boxShadow: "0 4px 16px rgba(245,158,11,0.3)",
            }}>
              <Crown size={28} color="#fff" />
            </div>
            <p style={{ fontSize: "1.15rem", fontWeight: 800, color: INK, margin: "0 0 0.15rem" }}>{top3[0].name}</p>
            <p style={{ fontSize: "0.8rem", color: INK_LIGHT, margin: "0 0 0.5rem" }}>{top3[0].role} @ {top3[0].company}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: GREEN }}>{top3[0].attendance}% attendance</span>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -5 }}
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "1.5rem",
              width: 200,
              textAlign: "center",
              border: "1px solid rgba(180,83,9,0.2)",
              boxShadow: "0 4px 20px rgba(180,83,9,0.08)",
            }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: `linear-gradient(135deg, #B45309, #D97706)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 0.75rem",
              boxShadow: "0 4px 12px rgba(180,83,9,0.3)",
            }}>
              <Award size={24} color="#fff" />
            </div>
            <p style={{ fontSize: "0.7rem", color: INK_LIGHT, fontWeight: 700, margin: "0 0 0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>3rd Place</p>
            <p style={{ fontSize: "1rem", fontWeight: 800, color: INK, margin: "0 0 0.15rem" }}>{top3[2].name}</p>
            <p style={{ fontSize: "0.78rem", color: INK_LIGHT, margin: "0 0 0.5rem" }}>{top3[2].role}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: PURPLE }}>{top3[2].sprints} sprints</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}
        >
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search size={16} color={INK_LIGHT} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search builders..."
              style={{
                width: "100%",
                padding: "0.65rem 0.75rem 0.65rem 2.25rem",
                borderRadius: 10,
                border: "1.5px solid rgba(91,63,248,0.12)",
                background: "#fff",
                color: INK,
                fontSize: "0.85rem",
                fontFamily: "inherit",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "0.3rem" }}>
            {["all", "trending", "top"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: 8,
                  border: "none",
                  background: filter === f ? PURPLE_XSOFT : "transparent",
                  color: filter === f ? PURPLE : INK_LIGHT,
                  fontSize: "0.8rem",
                  fontWeight: filter === f ? 700 : 500,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
              >
                {f === "all" ? "All Builders" : f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: "#fff",
            borderRadius: 20,
            border: "1px solid rgba(91,63,248,0.1)",
            boxShadow: cardShadow,
            overflow: "hidden",
          }}
        >
          {/* Table Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "60px 2fr 1.5fr 100px 80px 120px",
            gap: "0.75rem",
            padding: "0.875rem 1.5rem",
            background: PURPLE_XSOFT,
            fontSize: "0.7rem",
            fontWeight: 700,
            color: INK_MID,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}>
            <span>Rank</span>
            <span>Builder</span>
            <span>Role & Company</span>
            <span style={{ textAlign: "center" }}>Attendance</span>
            <span style={{ textAlign: "center" }}>Commits</span>
            <span style={{ textAlign: "right" }}>Credential</span>
          </div>

          {/* Table Rows */}
          {filtered.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ background: "rgba(91,63,248,0.02)" }}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 2fr 1.5fr 100px 80px 120px",
                gap: "0.75rem",
                padding: "0.875rem 1.5rem",
                alignItems: "center",
                borderTop: "1px solid rgba(91,63,248,0.05)",
                transition: "background 0.15s ease",
              }}
            >
              {/* Rank */}
              <RankBadge rank={member.rank} />

              {/* Builder */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: `linear-gradient(135deg, ${PURPLE_XSOFT}, #fff)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.8rem", fontWeight: 800, color: PURPLE,
                  flexShrink: 0,
                }}>
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: INK }}>{member.name}</span>
                    {member.trending && <Flame size={13} color={ORANGE} />}
                  </div>
                  <span style={{ fontSize: "0.72rem", color: INK_LIGHT }}>{member.streak}-day streak</span>
                </div>
              </div>

              {/* Role & Company */}
              <div>
                <p style={{ fontSize: "0.82rem", fontWeight: 600, color: INK_MID, margin: 0 }}>{member.role}</p>
                <p style={{ fontSize: "0.72rem", color: INK_LIGHT, margin: 0 }}>{member.company}</p>
              </div>

              {/* Attendance */}
              <div>
                <AttendanceBar value={member.attendance} />
              </div>

              {/* Commits */}
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: INK }}>{member.commits.toLocaleString()}</span>
              </div>

              {/* Credential Link */}
              <div style={{ textAlign: "right" }}>
                <Link
                  href={`/verify/${member.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    padding: "0.4rem 0.75rem",
                    borderRadius: 8,
                    background: GREEN_SOFT,
                    color: GREEN,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    fontFamily: "monospace",
                  }}
                >
                  <Shield size={11} /> {member.signature}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ textAlign: "center", fontSize: "0.75rem", color: INK_LIGHT, marginTop: "1.5rem", opacity: 0.6 }}
        >
          Credentials are cryptographically signed and publicly verifiable. Updated in real-time.
        </motion.p>
      </div>
    </div>
  );
}
