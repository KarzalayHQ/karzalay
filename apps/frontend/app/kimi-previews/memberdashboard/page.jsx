"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Calendar,
  GitCommit,
  Award,
  Clock,
  ArrowRight,
  Zap,
  CheckCircle2,
  AlertCircle,
  Users,
  MessageSquare,
  ClipboardList,
  BarChart3,
  Target,
  Flame,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Circle,
  Timer,
  Shield
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
  attendance: 94,
  sprintsCompleted: 7,
  totalSprints: 12,
  commits: 342,
  streak: 5,
  standupsThisWeek: 4,
  nextDeadline: "Sprint W8 Review",
  deadlineDate: "Tomorrow, 7:00 PM",
};

const MOCK_ACTIVITY = [
  { id: 1, type: "standup", message: "Submitted standup for Jun 28", time: "2 hours ago", icon: CheckCircle2, color: GREEN, bg: GREEN_SOFT },
  { id: 2, type: "commit", message: "Merged PR #42: Auth flow fix", time: "5 hours ago", icon: GitCommit, color: PURPLE, bg: PURPLE_XSOFT },
  { id: 3, type: "sprint", message: "Completed Sprint W7 — Design system", time: "1 day ago", icon: Target, color: ORANGE, bg: ORANGE_SOFT },
  { id: 4, type: "badge", message: "Earned 'Active Member' badge", time: "2 days ago", icon: Award, color: PURPLE, bg: PURPLE_XSOFT },
  { id: 5, type: "commit", message: "Pushed 12 commits to dashboard-ui", time: "2 days ago", icon: GitCommit, color: PURPLE, bg: PURPLE_XSOFT },
];

const MOCK_TEAM = [
  { name: "Alice Chen", role: "Frontend Lead", status: "online", avatar: "AC", color: "#5B3FF8" },
  { name: "Bob Kumar", role: "Backend Dev", status: "online", avatar: "BK", color: "#16A34A" },
  { name: "Charlie Singh", role: "Designer", status: "idle", avatar: "CS", color: "#EA580C" },
  { name: "Diana Patel", role: "Product Manager", status: "offline", avatar: "DP", color: "#7C3AED" },
  { name: "Evan Joshi", role: "Full Stack", status: "online", avatar: "EJ", color: "#059669" },
];

const MOCK_SPRINT_TICKETS = [
  { id: "KZ-201", title: "Dashboard analytics widget", status: "in_progress", priority: "P1", assignee: "AC" },
  { id: "KZ-202", title: "Standup form validation", status: "in_review", priority: "P2", assignee: "BK" },
  { id: "KZ-203", title: "Mobile nav responsive fix", status: "not_started", priority: "P1", assignee: "CS" },
];

const STATUS_CONFIG = {
  online: { color: "#23a559", label: "Online" },
  idle: { color: "#f0b232", label: "Idle" },
  offline: { color: "#80848e", label: "Offline" },
};

const TICKET_STATUS = {
  not_started: { label: "Not Started", color: "#6B6887", bg: "#F5F3FF" },
  in_progress: { label: "In Progress", color: PURPLE, bg: PURPLE_XSOFT },
  in_review: { label: "In Review", color: ORANGE, bg: ORANGE_SOFT },
  done: { label: "Done", color: GREEN, bg: GREEN_SOFT },
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

function StatCard({ icon: Icon, label, value, sub, trend, delay = 0 }) {
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
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: PURPLE_XSOFT,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={22} color={PURPLE} />
        </div>
        {trend && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.2rem",
            padding: "0.2rem 0.5rem", borderRadius: 6,
            background: GREEN_SOFT, fontSize: "0.7rem", fontWeight: 700, color: GREEN,
          }}>
            <TrendingUp size={12} /> +{trend}%
          </span>
        )}
      </div>
      <p style={{ fontSize: "1.6rem", fontWeight: 800, color: INK, letterSpacing: "-0.03em", margin: "0 0 0.15rem" }}>
        {value}
      </p>
      <p style={{ fontSize: "0.8rem", color: INK_LIGHT, margin: "0 0 0.15rem" }}>{label}</p>
      {sub && <p style={{ fontSize: "0.7rem", color: INK_LIGHT, margin: 0, opacity: 0.7 }}>{sub}</p>}
    </motion.div>
  );
}

function PresenceDot({ status }) {
  const config = STATUS_CONFIG[status];
  return (
    <div style={{ position: "relative", width: 10, height: 10 }}>
      <div style={{
        width: 10, height: 10, borderRadius: "50%",
        background: config.color,
        border: "2px solid #fff",
        boxSizing: "border-box",
      }} />
    </div>
  );
}

function QuickAction({ icon: Icon, label, desc, href, color = PURPLE, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}>
      <Link href={href} style={{ textDecoration: "none" }}>
        <motion.div
          whileHover={{ x: 4, background: PURPLE_XSOFT }}
          style={{
            display: "flex", alignItems: "center", gap: "0.875rem",
            padding: "0.875rem 1rem", borderRadius: 14,
            border: "1px solid rgba(91,63,248,0.08)",
            background: "#fff",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon size={20} color={color} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: INK, margin: "0 0 0.1rem" }}>{label}</p>
            <p style={{ fontSize: "0.72rem", color: INK_LIGHT, margin: 0 }}>{desc}</p>
          </div>
          <ChevronRight size={16} color={INK_LIGHT} />
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MEMBER DASHBOARD
   ═══════════════════════════════════════════ */
export default function MemberDashboard({ user }) {
  const [timeLeft, setTimeLeft] = useState("");

  // Countdown to next standup (10:00 AM IST)
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const standupTime = new Date(ist);
      standupTime.setHours(10, 0, 0, 0);
      if (ist > standupTime) standupTime.setDate(standupTime.getDate() + 1);
      const diff = standupTime - ist;
      const hours = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(`${hours}h ${mins}m`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.5rem", maxWidth: 1200 }}>

      {/* ─── LEFT COLUMN ─── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Welcome + Standup CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: gradientBg,
            borderRadius: 20,
            padding: "1.75rem 2rem",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", bottom: -20, right: 60, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem", opacity: 0.9 }}>
                <Sparkles size={14} />
                <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em" }}>Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 17 ? "Afternoon" : "Evening"}</span>
              </div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 0.35rem", letterSpacing: "-0.02em" }}>
                {user?.name || "Member"}
              </h2>
              <p style={{ fontSize: "0.8rem", opacity: 0.85, margin: 0 }}>
                {MOCK_STATS.streak}-day standup streak · {MOCK_STATS.commits} commits
              </p>
            </div>
            <Link href="/dashboard/standup" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "0.7rem 1.25rem",
                  borderRadius: 12,
                  border: "none",
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  color: "#fff",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <ClipboardList size={16} />
                Submit Standup
                <ChevronRight size={16} />
              </motion.button>
            </Link>
          </div>

          {/* Standup window indicator */}
          <div style={{
            marginTop: "1rem",
            padding: "0.6rem 0.875rem",
            background: "rgba(255,255,255,0.1)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.75rem",
            width: "fit-content",
          }}>
            <Timer size={14} />
            Next standup window: {timeLeft} · 9:30–10:30 AM IST
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          <StatCard icon={Calendar} label="Attendance" value={`${MOCK_STATS.attendance}%`} sub="This month" trend={2.4} delay={0.1} />
          <StatCard icon={Target} label="Sprints" value={`${MOCK_STATS.sprintsCompleted}/${MOCK_STATS.totalSprints}`} sub="Completed" trend={5.1} delay={0.2} />
          <StatCard icon={GitCommit} label="Commits" value={`${MOCK_STATS.commits}`} sub="Total contributions" trend={12.3} delay={0.3} />
        </div>

        {/* Two-column: Activity + Sprint */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>

          {/* Activity Feed */}
          <GlassCard>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <Eyebrow>Activity</Eyebrow>
              <span style={{ fontSize: "0.75rem", color: INK_LIGHT, fontWeight: 500 }}>Recent</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {MOCK_ACTIVITY.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}
                >
                  <div style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: item.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <item.icon size={16} color={item.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, color: INK, margin: "0 0 0.1rem", lineHeight: 1.4 }}>
                      {item.message}
                    </p>
                    <p style={{ fontSize: "0.7rem", color: INK_LIGHT, margin: 0 }}>{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Current Sprint Tickets */}
          <GlassCard>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <Eyebrow>Sprint W8</Eyebrow>
              <Link href="/dashboard/sprint" style={{ fontSize: "0.75rem", color: PURPLE, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.2rem" }}>
                View All <ArrowRight size={12} />
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {MOCK_SPRINT_TICKETS.map((ticket, i) => {
                const status = TICKET_STATUS[ticket.status];
                return (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 3, background: PURPLE_XSOFT }}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: 12,
                      border: "1px solid rgba(91,63,248,0.06)",
                      background: "#FAFAFF",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: INK_LIGHT, fontFamily: "monospace" }}>{ticket.id}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span style={{ padding: "0.1rem 0.4rem", borderRadius: 4, background: status.bg, fontSize: "0.65rem", fontWeight: 700, color: status.color }}>
                          {status.label}
                        </span>
                        <span style={{ padding: "0.1rem 0.4rem", borderRadius: 4, background: ticket.priority === "P1" ? "#FEF2F2" : PURPLE_XSOFT, fontSize: "0.65rem", fontWeight: 700, color: ticket.priority === "P1" ? RED : PURPLE }}>
                          {ticket.priority}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, color: INK, margin: 0, lineHeight: 1.4 }}>{ticket.title}</p>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* ─── RIGHT SIDEBAR ─── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

        {/* Deadline Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: ORANGE_SOFT,
            borderRadius: 16,
            padding: "1.25rem",
            border: "1px solid rgba(234,88,12,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <AlertCircle size={16} color={ORANGE} />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: ORANGE }}>Upcoming</span>
          </div>
          <p style={{ fontSize: "0.9rem", fontWeight: 700, color: INK, margin: "0 0 0.15rem" }}>{MOCK_STATS.nextDeadline}</p>
          <p style={{ fontSize: "0.75rem", color: INK_LIGHT, margin: "0 0 0.75rem" }}>{MOCK_STATS.deadlineDate}</p>
          <div style={{ height: 4, borderRadius: 2, background: "rgba(234,88,12,0.1)", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ height: "100%", background: `linear-gradient(90deg, ${ORANGE}, #F97316)`, borderRadius: 2 }}
            />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <GlassCard style={{ padding: "1.25rem" }}>
          <Eyebrow>Quick Actions</Eyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.75rem" }}>
            <QuickAction icon={ClipboardList} label="Submit Standup" desc="Daily 9:30-10:30 AM" href="/dashboard/standup" delay={0.1} />
            <QuickAction icon={BarChart3} label="Sprint Board" desc="3 active tickets" href="/dashboard/sprint" delay={0.15} />
            <QuickAction icon={Award} label="My Credential" desc="View public profile" href={`/verify/${user?.id || "me"}`} delay={0.2} />
            <QuickAction icon={ExternalLink} label="Company Directory" desc="Browse 12 cities" href="/cities" delay={0.25} />
          </div>
        </GlassCard>

        {/* Team Presence */}
        <GlassCard style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <Eyebrow>Team</Eyebrow>
            <span style={{ fontSize: "0.7rem", color: INK_LIGHT }}>{MOCK_TEAM.filter(m => m.status === "online").length} online</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {MOCK_TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
              >
                <div style={{ position: "relative" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: member.color + "20",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.75rem", fontWeight: 800, color: member.color,
                  }}>
                    {member.avatar}
                  </div>
                  <div style={{ position: "absolute", bottom: -1, right: -1 }}>
                    <PresenceDot status={member.status} />
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: INK, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {member.name}
                  </p>
                  <p style={{ fontSize: "0.7rem", color: INK_LIGHT, margin: 0 }}>{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Credential Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ y: -3 }}
          style={{
            background: gradientBg,
            borderRadius: 16,
            padding: "1.25rem",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <Shield size={16} />
            <span style={{ fontSize: "0.75rem", fontWeight: 700, opacity: 0.9 }}>VERIFIED CREDENTIAL</span>
          </div>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, margin: "0 0 0.15rem" }}>{user?.name || "Member"}</p>
          <p style={{ fontSize: "0.7rem", opacity: 0.8, margin: "0 0 0.75rem" }}>Frontend Dev @ Nexus UI</p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 800, margin: "0 0 0.05rem" }}>{MOCK_STATS.attendance}%</p>
              <p style={{ fontSize: "0.6rem", opacity: 0.7, margin: 0 }}>Attendance</p>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.2)" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 800, margin: "0 0 0.05rem" }}>{MOCK_STATS.commits}</p>
              <p style={{ fontSize: "0.6rem", opacity: 0.7, margin: 0 }}>Commits</p>
            </div>
            <div style={{ width: 1, background: "rgba(255,255,255,0.2)" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 800, margin: "0 0 0.05rem" }}>8 mo</p>
              <p style={{ fontSize: "0.6rem", opacity: 0.7, margin: 0 }}>Duration</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
