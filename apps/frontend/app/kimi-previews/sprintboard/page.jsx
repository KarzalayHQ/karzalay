"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MoreHorizontal,
  GripVertical,
  Clock,
  MessageSquare,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  ArrowUpCircle,
  ChevronDown,
  Filter,
  Search,
  GitCommit,
  Calendar,
  Users,
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
const ORANGE_SOFT = "#FFF7ED";
const RED = "#DC2626";
const RED_SOFT = "#FEF2F2";
const BLUE = "#3B82F6";
const BLUE_SOFT = "#EFF6FF";
const GRAY = "#9CA3AF";
const GRAY_SOFT = "#F3F4F6";

const gradientBg = "linear-gradient(135deg, #5B3FF8 0%, #8B5CF6 50%, #A78BFA 100%)";
const cardShadow = "0 2px 12px rgba(91,63,248,0.07)";
const cardShadowHover = "0 16px 40px rgba(91,63,248,0.13)";

/* ─── Column Config ─── */
const COLUMNS = [
  { id: "not_started", label: "Not Started", color: GRAY, bg: GRAY_SOFT, icon: Circle },
  { id: "in_progress", label: "In Progress", color: BLUE, bg: BLUE_SOFT, icon: Zap },
  { id: "in_review", label: "In Review", color: ORANGE, bg: ORANGE_SOFT, icon: Clock },
  { id: "done", label: "Done", color: GREEN, bg: GREEN_SOFT, icon: CheckCircle2 },
];

/* ─── Mock Tickets ─── */
const INITIAL_TICKETS = [
  { id: "KZ-101", title: "Auth pages — login & register flow", sprint: "W8", priority: "P1", status: "not_started", assignee: { name: "Alice", avatar: "AC", color: "#5B3FF8" }, tags: ["Frontend", "Auth"], comments: 3, due: "Jul 2" },
  { id: "KZ-102", title: "Dashboard analytics widget design", sprint: "W8", priority: "P2", status: "not_started", assignee: { name: "Charlie", avatar: "CS", color: "#EA580C" }, tags: ["Design"], comments: 1, due: "Jul 3" },
  { id: "KZ-103", title: "API rate limiting middleware", sprint: "W8", priority: "P1", status: "not_started", assignee: { name: "Bob", avatar: "BK", color: "#16A34A" }, tags: ["Backend"], comments: 0, due: "Jul 1" },
  { id: "KZ-104", title: "Sprint board drag & drop", sprint: "W8", priority: "P1", status: "in_progress", assignee: { name: "Alice", avatar: "AC", color: "#5B3FF8" }, tags: ["Frontend"], comments: 5, due: "Jun 30" },
  { id: "KZ-105", title: "Standup form time validation", sprint: "W8", priority: "P2", status: "in_progress", assignee: { name: "Evan", avatar: "EJ", color: "#059669" }, tags: ["Frontend", "Logic"], comments: 2, due: "Jul 1" },
  { id: "KZ-106", title: "Member presence sidebar", sprint: "W8", priority: "P1", status: "in_review", assignee: { name: "Bob", avatar: "BK", color: "#16A34A" }, tags: ["Frontend", "UI"], comments: 4, due: "Jun 29" },
  { id: "KZ-107", title: "Credential verification page", sprint: "W8", priority: "P2", status: "in_review", assignee: { name: "Diana", avatar: "DP", color: "#7C3AED" }, tags: ["Frontend"], comments: 2, due: "Jun 30" },
  { id: "KZ-108", title: "Onboarding flow — 3 gates", sprint: "W8", priority: "P1", status: "done", assignee: { name: "Alice", avatar: "AC", color: "#5B3FF8" }, tags: ["Frontend", "Flow"], comments: 8, due: "Jun 28" },
  { id: "KZ-109", title: "Landing page redesign", sprint: "W8", priority: "P1", status: "done", assignee: { name: "Charlie", avatar: "CS", color: "#EA580C" }, tags: ["Design", "UI"], comments: 6, due: "Jun 27" },
];

const AVATAR_COLORS = ["#5B3FF8", "#16A34A", "#EA580C", "#7C3AED", "#059669", "#DC2626", "#3B82F6", "#F59E0B"];

/* ─── Components ─── */
function Circle({ size, color }) { return <div style={{ width: size, height: size, borderRadius: "50%", border: `2px solid ${color}` }} />; }

function Eyebrow({ children }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", background: gradientBg, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0 }}>
      {children}
    </p>
  );
}

function PriorityBadge({ priority }) {
  const isP1 = priority === "P1";
  return (
    <span style={{
      padding: "0.12rem 0.4rem",
      borderRadius: 5,
      background: isP1 ? RED_SOFT : PURPLE_XSOFT,
      color: isP1 ? RED : PURPLE,
      fontSize: "0.65rem",
      fontWeight: 800,
      fontFamily: "monospace",
    }}>
      {priority}
    </span>
  );
}

function TagBadge({ tag }) {
  return (
    <span style={{
      padding: "0.1rem 0.4rem",
      borderRadius: 4,
      background: "rgba(91,63,248,0.06)",
      color: INK_LIGHT,
      fontSize: "0.65rem",
      fontWeight: 600,
    }}>
      {tag}
    </span>
  );
}

/* ═══════════════════════════════════════════
   SPRINT BOARD
   ═══════════════════════════════════════════ */
export default function SprintBoard() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === "all" || t.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const handleDragStart = (ticketId) => {
    setDraggedId(ticketId);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDrop = (columnId) => {
    if (draggedId) {
      setTickets(prev => prev.map(t => t.id === draggedId ? { ...t, status: columnId } : t));
      setDraggedId(null);
      setDragOverColumn(null);
    }
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const columnCounts = COLUMNS.reduce((acc, col) => {
    acc[col.id] = filteredTickets.filter(t => t.status === col.id).length;
    return acc;
  }, {});

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", height: "100%" }}>

      {/* Board Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Eyebrow>Active Sprint</Eyebrow>
            <span style={{ padding: "0.2rem 0.6rem", borderRadius: 6, background: PURPLE_XSOFT, fontSize: "0.75rem", fontWeight: 700, color: PURPLE }}>
              W8
            </span>
            <span style={{ padding: "0.2rem 0.6rem", borderRadius: 6, background: GREEN_SOFT, fontSize: "0.75rem", fontWeight: 700, color: GREEN }}>
              {tickets.filter(t => t.status === "done").length}/{tickets.length} done
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search size={14} color={INK_LIGHT} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                padding: "0.5rem 0.75rem 0.5rem 2rem",
                borderRadius: 10,
                border: "1.5px solid rgba(91,63,248,0.12)",
                background: "#F8F7FC",
                fontSize: "0.8rem",
                fontFamily: "inherit",
                color: INK,
                outline: "none",
                width: 180,
              }}
            />
          </div>

          {/* Priority Filter */}
          <select
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: 10,
              border: "1.5px solid rgba(91,63,248,0.12)",
              background: "#F8F7FC",
              fontSize: "0.8rem",
              fontFamily: "inherit",
              color: INK,
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="all">All Priorities</option>
            <option value="P1">P1 — High</option>
            <option value="P2">P2 — Normal</option>
          </select>
        </div>
      </motion.div>

      {/* Kanban Columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
        flex: 1,
        minHeight: 0,
        overflowX: "auto",
      }}>
        {COLUMNS.map((column, colIdx) => {
          const columnTickets = filteredTickets.filter(t => t.status === column.id);
          const isDragOver = dragOverColumn === column.id;

          return (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: colIdx * 0.1 }}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDrop={() => handleDrop(column.id)}
              onDragLeave={handleDragLeave}
              style={{
                background: isDragOver ? column.bg : "#FAFAFF",
                borderRadius: 16,
                border: isDragOver ? `2px dashed ${column.color}` : "1px solid rgba(91,63,248,0.06)",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                minHeight: 400,
                transition: "all 0.2s ease",
              }}
            >
              {/* Column Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <column.icon size={16} color={column.color} />
                  <h3 style={{ fontSize: "0.8rem", fontWeight: 700, color: column.color, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {column.label}
                  </h3>
                </div>
                <span style={{
                  padding: "0.15rem 0.5rem",
                  borderRadius: 6,
                  background: column.bg,
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  color: column.color,
                  minWidth: 24,
                  textAlign: "center",
                }}>
                  {columnCounts[column.id]}
                </span>
              </div>

              {/* Tickets */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
                <AnimatePresence mode="popLayout">
                  {columnTickets.map((ticket, i) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      index={i}
                      onDragStart={() => handleDragStart(ticket.id)}
                      isDragging={draggedId === ticket.id}
                    />
                  ))}
                </AnimatePresence>

                {/* Empty State */}
                {columnTickets.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "2rem 1rem",
                      border: `2px dashed ${column.color}20`,
                      borderRadius: 12,
                      minHeight: 120,
                    }}
                  >
                    <CheckCircle2 size={24} color={`${column.color}40`} />
                    <p style={{ fontSize: "0.75rem", color: `${column.color}80`, margin: "0.5rem 0 0", fontWeight: 500 }}>
                      Nothing here yet
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Ticket Card ─── */
function TicketCard({ ticket, index, onDragStart, isDragging }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      draggable
      onDragStart={onDragStart}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, rotateX: 3, rotateY: 2, boxShadow: cardShadowHover }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 14,
        border: hovered ? "1.5px solid rgba(91,63,248,0.2)" : "1.5px solid rgba(91,63,248,0.06)",
        boxShadow: hovered ? cardShadowHover : cardShadow,
        padding: "1rem",
        cursor: "grab",
        position: "relative",
        transition: "all 0.22s ease",
      }}
    >
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <PriorityBadge priority={ticket.priority} />
          <span style={{ fontSize: "0.7rem", color: INK_LIGHT, fontFamily: "monospace", fontWeight: 600 }}>
            {ticket.id}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: INK_LIGHT }}
        >
          <MoreHorizontal size={14} />
        </motion.button>
      </div>

      {/* Title */}
      <p style={{ fontSize: "0.85rem", fontWeight: 700, color: INK, margin: "0 0 0.6rem", lineHeight: 1.4 }}>
        {ticket.title}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
        {ticket.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {/* Assignee */}
          <div style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: ticket.assignee.color + "20",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.65rem",
            fontWeight: 800,
            color: ticket.assignee.color,
          }}>
            {ticket.assignee.avatar.charAt(0)}
          </div>

          {/* Comments */}
          {ticket.comments > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontSize: "0.7rem", color: INK_LIGHT }}>
              <MessageSquare size={12} />
              {ticket.comments}
            </div>
          )}
        </div>

        {/* Due date */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.7rem", color: INK_LIGHT }}>
          <Calendar size={12} />
          {ticket.due}
        </div>
      </div>
    </motion.div>
  );
}
