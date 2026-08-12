"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ClipboardCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Shield,
  Award,
  ArrowRight,
  ChevronRight,
  Clock,
  GitCommit,
  Target,
  Zap,
  Crown,
  Flame,
  MoreHorizontal,
  Search,
  Filter,
  Sparkles,
  BarChart3,
  MessageSquare,
  UserCheck,
  Timer
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
const YELLOW = "#F59E0B";

const gradientText = {
  background: "linear-gradient(135deg, #5B3FF8 0%, #8B5CF6 50%, #A78BFA 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};
const gradientBg = "linear-gradient(135deg, #5B3FF8 0%, #8B5CF6 50%, #A78BFA 100%)";
const cardShadow = "0 2px 12px rgba(91,63,248,0.07)";
const cardShadowHover = "0 16px 40px rgba(91,63,248,0.13)";

/* ─── Mock Data ─── */
const MOCK_STATS = {
  pendingApprovals: 3,
  activeSprint: "W8",
  networkRank: 4,
  teamSize: 8,
  attendanceRate: 91,
  commitsThisWeek: 47,
};

const MOCK_HR_INBOX = [
  { id: 1, member: "Evan Joshi", avatar: "EJ", issue: "Missed standup (Jun 28)", severity: "warning", days: 1 },
  { id: 2, member: "Diana Patel", avatar: "DP", issue: "Missed standup (Jun 27)", severity: "critical", days: 2 },
  { id: 3, member: "Charlie Singh", avatar: "CS", issue: "Late standup 3 days streak", severity: "warning", days: 0 },
];

const MOCK_PROMOTIONS = [
  { id: 1, member: "Alice Chen", avatar: "AC", role: "Frontend Dev", proposedRole: "Senior Frontend", sprintScore: 98, attendance: 96 },
  { id: 2, member: "Bob Kumar", avatar: "BK", role: "Backend Dev", proposedRole: "Tech Lead", sprintScore: 94, attendance: 92 },
];

const MOCK_TEAM = [
  { name: "Alice Chen", role: "Frontend Lead", status: "online", attendance: 96, commits: 142, sprints: 7, avatar: "AC", color: "#5B3FF8" },
  { name: "Bob Kumar", role: "Backend Dev", status: "online", attendance: 92, commits: 98, sprints: 6, avatar: "BK", color: "#16A34A" },
  { name: "Charlie Singh", role: "Designer", status: "idle", attendance: 88, commits: 45, sprints: 5, avatar: "CS", color: "#EA580C" },
  { name: "Diana Patel", role: "Product Manager", status: "offline", attendance: 78, commits: 23, sprints: 4, avatar: "DP", color: "#7C3AED" },
  { name: "Evan Joshi", role: "Full Stack", status: "online", attendance: 95, commits: 112, sprints: 7, avatar: "EJ", color: "#059669" },
];

const MOCK_ECOSYSTEM = [
  { rank: 1, name: "Nexus UI", city: "Mumbai", members: 12, velocity: 94, trend: "up" },
  { rank: 2, name: "CodeForge", city: "Delhi", members: 9, velocity: 89, trend: "up" },
  { rank: 3, name: "PixelPerfect", city: "Bengaluru", members: 15, velocity: 87, trend: "down" },
  { rank: 4, name: "CloudSync", city: "Hyderabad", members: 7, velocity: 82, trend: "up" },
  { rank: 5, name: "DataWeave", city: "Pune", members: 11, velocity: 78, trend: "same" },
];

const STATUS_COLORS = {
  online: "#23a559",
  idle: "#f0b232",
  offline: "#80848e",
};

/* ─── Components ─── */

function Eyebrow({ children }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", ...gradientText, margin: 0 }}>
      {children}
    </p>
  );
}

function GlassCard({ children, style = {}, hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, rotateX: 2, rotateY: 1, boxShadow: cardShadowHover } : {}}
      transition={{ duration: 0.22 }}
      style={{
        background: "#fff",
        borderRadius: 20,
        border: "1px solid rgba(91,63,248,0.1)",
        boxShadow: cardShadow,
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color = PURPLE, bg = PURPLE_XSOFT, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5, rotateX: 4, rotateY: -2, boxShadow: cardShadowHover }}
      style={{
        background: "#fff",
        borderRadius: 20,
        border: "1px solid rgba(91,63,248,0.1)",
        boxShadow: cardShadow,
        padding: "1.5rem",
        cursor: "default",
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 14, background: bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "0.75rem",
      }}>
        <Icon size={22} color={color} />
      </div>
      <p style={{ fontSize: "1.6rem", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: "0 0 0.15rem" }}>
        {value}
      </p>
      <p style={{ fontSize: "0.8rem", color: INK_LIGHT, margin: "0 0 0.15rem" }}>{label}</p>
      {sub && <p style={{ fontSize: "0.7rem", color: INK_LIGHT, margin: 0, opacity: 0.7 }}>{sub}</p>}
    </motion.div>
  );
}

function ActionButton({ children, onClick, variant = "primary", size = "md", style = {} }) {
  const isPrimary = variant === "primary";
  const sizes = { sm: { padding: "0.4rem 0.75rem", fontSize: "0.75rem" }, md: { padding: "0.6rem 1rem", fontSize: "0.8rem" } };
  const s = sizes[size];
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        borderRadius: 10,
        border: isPrimary ? "none" : `1.5px solid ${PURPLE_SOFT}`,
        background: isPrimary ? gradientBg : "transparent",
        color: isPrimary ? "#fff" : PURPLE,
        fontWeight: 700,
        fontFamily: "inherit",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        ...s,
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════
   LEAD DASHBOARD
   ═══════════════════════════════════════════ */
export default function LeadDashboard({ user }) {
  const [hrFilter, setHrFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHR = MOCK_HR_INBOX.filter(item => {
    if (hrFilter === "critical") return item.severity === "critical";
    if (hrFilter === "warning") return item.severity === "warning";
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* ─── Stats Row ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
        <StatCard icon={ClipboardCheck} label="Pending Approvals" value={MOCK_STATS.pendingApprovals} sub="Member requests" color={ORANGE} bg={ORANGE_SOFT} delay={0.05} />
        <StatCard icon={Target} label="Active Sprint" value={MOCK_STATS.activeSprint} sub="In progress" color={PURPLE} bg={PURPLE_XSOFT} delay={0.1} />
        <StatCard icon={TrendingUp} label="Network Rank" value={`#${MOCK_STATS.networkRank}`} sub="Of 24 companies" color={GREEN} bg={GREEN_SOFT} delay={0.15} />
        <StatCard icon={Users} label="Team Size" value={MOCK_STATS.teamSize} sub={`${MOCK_TEAM.filter(m => m.status === "online").length} online now`} color={PURPLE_MID} bg={PURPLE_XSOFT} delay={0.2} />
      </div>

      {/* ─── Main Grid: HR + Credential + Ecosystem ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>

        {/* HR Inbox */}
        <GlassCard>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div>
              <Eyebrow>HR Inbox</Eyebrow>
              <p style={{ fontSize: "0.8rem", color: INK_LIGHT, margin: "0.25rem 0 0" }}>Standup attendance issues</p>
            </div>
            <div style={{ display: "flex", gap: "0.3rem" }}>
              {["all", "critical", "warning"].map(f => (
                <button
                  key={f}
                  onClick={() => setHrFilter(f)}
                  style={{
                    padding: "0.25rem 0.6rem",
                    borderRadius: 6,
                    border: "none",
                    background: hrFilter === f ? PURPLE_XSOFT : "transparent",
                    color: hrFilter === f ? PURPLE : INK_LIGHT,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            <AnimatePresence>
              {filteredHR.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    padding: "0.875rem 1rem",
                    borderRadius: 14,
                    border: "1px solid",
                    borderColor: item.severity === "critical" ? "rgba(220,38,38,0.1)" : "rgba(245,158,11,0.1)",
                    background: item.severity === "critical" ? RED_SOFT : "#FFFBEB",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: item.severity === "critical" ? "rgba(220,38,38,0.1)" : "rgba(245,158,11,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.8rem", fontWeight: 800,
                    color: item.severity === "critical" ? RED : YELLOW,
                    flexShrink: 0,
                  }}>
                    {item.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.82rem", fontWeight: 700, color: INK, margin: "0 0 0.1rem" }}>{item.member}</p>
                    <p style={{ fontSize: "0.72rem", color: INK_LIGHT, margin: 0 }}>{item.issue}</p>
                  </div>
                  <div style={{ display: "flex", gap: "0.3rem", flexShrink: 0 }}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Warn"
                      style={{
                        width: 32, height: 32, borderRadius: 8,
                        border: "none", background: "rgba(245,158,11,0.1)",
                        color: YELLOW, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <AlertTriangle size={15} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Exempt"
                      style={{
                        width: 32, height: 32, borderRadius: 8,
                        border: "none", background: GREEN_SOFT,
                        color: GREEN, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <CheckCircle2 size={15} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </GlassCard>

        {/* Credential Workflow */}
        <GlassCard>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div>
              <Eyebrow>Credential Workflow</Eyebrow>
              <p style={{ fontSize: "0.8rem", color: INK_LIGHT, margin: "0.25rem 0 0" }}>Review promotion requests</p>
            </div>
            <div style={{ padding: "0.3rem 0.6rem", borderRadius: 8, background: GREEN_SOFT, fontSize: "0.7rem", fontWeight: 700, color: GREEN }}>
              {MOCK_PROMOTIONS.length} pending
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {MOCK_PROMOTIONS.map((promo, i) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: "1rem",
                  borderRadius: 14,
                  border: "1px solid rgba(91,63,248,0.08)",
                  background: PURPLE_XSOFT,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12,
                    background: "rgba(91,63,248,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.85rem", fontWeight: 800, color: PURPLE,
                  }}>
                    {promo.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.88rem", fontWeight: 700, color: INK, margin: "0 0 0.1rem" }}>{promo.member}</p>
                    <p style={{ fontSize: "0.72rem", color: INK_LIGHT, margin: 0 }}>
                      {promo.role} <ArrowRight size={10} style={{ display: "inline", color: PURPLE }} /> {promo.proposedRole}
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem" }}>
                  <div style={{ flex: 1, padding: "0.5rem", background: "#fff", borderRadius: 8, textAlign: "center" }}>
                    <p style={{ fontSize: "0.9rem", fontWeight: 800, color: INK, margin: "0 0 0.05rem" }}>{promo.sprintScore}%</p>
                    <p style={{ fontSize: "0.6rem", color: INK_LIGHT, margin: 0 }}>Sprint Score</p>
                  </div>
                  <div style={{ flex: 1, padding: "0.5rem", background: "#fff", borderRadius: 8, textAlign: "center" }}>
                    <p style={{ fontSize: "0.9rem", fontWeight: 800, color: INK, margin: "0 0 0.05rem" }}>{promo.attendance}%</p>
                    <p style={{ fontSize: "0.6rem", color: INK_LIGHT, margin: 0 }}>Attendance</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <ActionButton variant="secondary" size="sm" style={{ flex: 1 }}>
                    <XCircle size={14} /> Decline
                  </ActionButton>
                  <ActionButton variant="primary" size="sm" style={{ flex: 1 }}>
                    <CheckCircle2 size={14} /> Approve
                  </ActionButton>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* ─── Bottom Row: Team Performance + Ecosystem ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "1rem" }}>

        {/* Team Performance Table */}
        <GlassCard>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div>
              <Eyebrow>Team Performance</Eyebrow>
              <p style={{ fontSize: "0.8rem", color: INK_LIGHT, margin: "0.25rem 0 0" }}>Sprint metrics by member</p>
            </div>
            <div style={{ position: "relative" }}>
              <Search size={14} color={INK_LIGHT} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="text"
                placeholder="Search member..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  padding: "0.4rem 0.75rem 0.4rem 2rem",
                  borderRadius: 8,
                  border: "1.5px solid rgba(91,63,248,0.12)",
                  background: "#F8F7FC",
                  fontSize: "0.78rem",
                  fontFamily: "inherit",
                  color: INK,
                  outline: "none",
                  width: 150,
                }}
              />
            </div>
          </div>

          {/* Table Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: "0.5rem",
            padding: "0.5rem 0.75rem",
            fontSize: "0.7rem",
            fontWeight: 700,
            color: INK_LIGHT,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            borderBottom: "1px solid rgba(91,63,248,0.08)",
          }}>
            <span>Member</span>
            <span style={{ textAlign: "center" }}>Status</span>
            <span style={{ textAlign: "center" }}>Attendance</span>
            <span style={{ textAlign: "center" }}>Commits</span>
            <span style={{ textAlign: "center" }}>Sprints</span>
          </div>

          {/* Table Rows */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {MOCK_TEAM.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase())).map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ background: PURPLE_XSOFT }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                  gap: "0.5rem",
                  padding: "0.6rem 0.75rem",
                  alignItems: "center",
                  borderRadius: 8,
                  transition: "background 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <div style={{ position: "relative" }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 10,
                      background: member.color + "18",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.75rem", fontWeight: 800, color: member.color,
                    }}>
                      {member.avatar}
                    </div>
                    <div style={{ position: "absolute", bottom: -1, right: -1, width: 10, height: 10, borderRadius: "50%", background: STATUS_COLORS[member.status], border: "2px solid #fff" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.82rem", fontWeight: 700, color: INK, margin: 0 }}>{member.name}</p>
                    <p style={{ fontSize: "0.68rem", color: INK_LIGHT, margin: 0 }}>{member.role}</p>
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{
                    padding: "0.15rem 0.5rem", borderRadius: 6,
                    background: member.status === "online" ? GREEN_SOFT : member.status === "idle" ? "#FEF3C7" : "#F3F4F6",
                    color: member.status === "online" ? GREEN : member.status === "idle" ? YELLOW : INK_LIGHT,
                    fontSize: "0.65rem", fontWeight: 700,
                  }}>
                    {member.status}
                  </span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: member.attendance >= 90 ? GREEN : member.attendance >= 80 ? YELLOW : RED }}>
                    {member.attendance}%
                  </span>
                </div>
                <div style={{ textAlign: "center", fontSize: "0.8rem", fontWeight: 600, color: INK_MID }}>
                  {member.commits}
                </div>
                <div style={{ textAlign: "center", fontSize: "0.8rem", fontWeight: 600, color: INK_MID }}>
                  {member.sprints}
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Ecosystem Pulse */}
        <GlassCard>
          <div style={{ marginBottom: "1rem" }}>
            <Eyebrow>Ecosystem Pulse</Eyebrow>
            <p style={{ fontSize: "0.8rem", color: INK_LIGHT, margin: "0.25rem 0 0" }}>Network leaderboard</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {MOCK_ECOSYSTEM.map((company, i) => (
              <motion.div
                key={company.rank}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 3, background: PURPLE_XSOFT }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  borderRadius: 12,
                  background: company.rank === MOCK_STATS.networkRank ? PURPLE_XSOFT : "#FAFAFF",
                  border: company.rank === MOCK_STATS.networkRank ? "1px solid rgba(91,63,248,0.15)" : "1px solid transparent",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: company.rank <= 3 ? gradientBg : PURPLE_XSOFT,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.75rem", fontWeight: 800,
                  color: company.rank <= 3 ? "#fff" : INK_LIGHT,
                  flexShrink: 0,
                }}>
                  {company.rank}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.82rem", fontWeight: 700, color: INK, margin: "0 0 0.05rem" }}>
                    {company.name}
                    {company.rank === MOCK_STATS.networkRank && (
                      <span style={{ marginLeft: "0.4rem", fontSize: "0.6rem", padding: "0.1rem 0.35rem", borderRadius: 4, background: PURPLE_SOFT, color: PURPLE, fontWeight: 700 }}>YOU</span>
                    )}
                  </p>
                  <p style={{ fontSize: "0.68rem", color: INK_LIGHT, margin: 0 }}>{company.city} · {company.members} members</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 800, color: INK, margin: "0 0 0.05rem" }}>{company.velocity}</p>
                  <p style={{ fontSize: "0.6rem", color: INK_LIGHT, margin: 0 }}>velocity</p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
