'use client';

/* ═══════════════════════════════════════════
 * File: app/cities/page.tsx
 * Purpose: A browseable directory of all active company cohorts (sprints) across cities.
 * Design Decisions:
 * - Uses a flex wrap / grid layout for company cards.
 * - Simple filtering state to sort companies by sector or hiring status.
 * Tokens Used:
 * - ORANGE for active filter states, PURPLE for hover outlines.
 * Component Connections:
 * - Links to individual company details at /cities/[id].
 * ═══════════════════════════════════════════ */

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/ui/Navbar';
import { Users, LayoutGrid, CheckCircle2 } from 'lucide-react';

const PURPLE = "#5B3FF8";
const PURPLE_LIGHT = "#A78BFA";
const PURPLE_SOFT = "#EDE9FE";
const PURPLE_XSOFT = "#F5F3FF";
const INK = "#1A1040";
const INK_MID = "#3D3A5C";
const INK_LIGHT = "#6B6887";
const GREEN = "#16A34A";
const GREEN_SOFT = "#DCFCE7";
const ORANGE = "#EA580C";

const MOCK_COMPANIES = [
  { 
    id: 'raasta-maps', 
    name: 'Raasta Maps', 
    sector: 'Navigation & Mapping', 
    description: 'Turn-by-turn navigation built for Indian roads.',
    hiring: true,
    memberCount: 14,
    demos: 47,
    logo: '🗺️',
    avatars: ['M', 'P', 'A', 'N']
  },
  { 
    id: 'pixel-forge', 
    name: 'Pixel Forge', 
    sector: 'Design Tools', 
    description: 'Design tools that think like designers.',
    hiring: false,
    memberCount: 8,
    demos: 34,
    logo: '🎨',
    avatars: ['J', 'S', 'R']
  },
  { 
    id: 'cloud-sync', 
    name: 'CloudSync', 
    sector: 'Infrastructure', 
    description: 'Infrastructure that scales itself.',
    hiring: true,
    memberCount: 15,
    demos: 62,
    logo: '☁️',
    avatars: ['A', 'B', 'C']
  },
  { 
    id: 'data-flow', 
    name: 'DataFlow', 
    sector: 'Analytics', 
    description: 'Analytics pipelines that explain themselves.',
    hiring: false,
    memberCount: 10,
    demos: 28,
    logo: '📊',
    avatars: ['D', 'E', 'F', 'G']
  },
  { 
    id: 'pay-grid', 
    name: 'PayGrid', 
    sector: 'Fintech', 
    description: 'Payments infrastructure for Bharat.',
    hiring: true,
    memberCount: 12,
    demos: 41,
    logo: '💳',
    avatars: ['H', 'I', 'J']
  },
  { 
    id: 'med-vault', 
    name: 'MedVault', 
    sector: 'HealthTech', 
    description: 'Your health records, always with you.',
    hiring: true,
    memberCount: 9,
    demos: 22,
    logo: '🏥',
    avatars: ['K', 'L', 'M']
  },
  { 
    id: 'edu-stack', 
    name: 'EduStack', 
    sector: 'EdTech', 
    description: 'Learning that adapts to you.',
    hiring: false,
    memberCount: 11,
    demos: 31,
    logo: '📚',
    avatars: ['N', 'O']
  },
  { 
    id: 'green-route', 
    name: 'GreenRoute', 
    sector: 'Sustainability', 
    description: 'Optimize your carbon footprint.',
    hiring: true,
    memberCount: 7,
    demos: 18,
    logo: '🌱',
    avatars: ['P', 'Q']
  }
];

const FILTERS = [
  "All", "Hiring Now", "Navigation & Mapping", "Design Tools", "Infrastructure", 
  "Analytics", "Fintech", "HealthTech", "EdTech", "Sustainability"
];

export default function CitiesPage() {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return MOCK_COMPANIES;
    if (filter === "Hiring Now") return MOCK_COMPANIES.filter(c => c.hiring);
    return MOCK_COMPANIES.filter(c => c.sector === filter);
  }, [filter]);

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "Inter, sans-serif" }}>
      <Navbar />
      
      {/* Hero Section */}
      <div style={{ textAlign: "center", padding: "4rem 1.5rem 2rem", maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: INK, margin: "0 0 0.5rem", letterSpacing: "-0.04em" }}>
          Browse the city
        </h1>
        <p style={{ fontSize: "1.05rem", color: INK_LIGHT, margin: 0 }}>
          Real companies building real products. Pick one and start working today.
        </p>
      </div>

      {/* Filters */}
      <div style={{ 
        display: "flex", gap: "0.5rem", overflowX: "auto", padding: "0 1.5rem 2rem", 
        maxWidth: 1000, margin: "0 auto", scrollbarWidth: "none" 
      }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: 999,
              border: "none",
              background: filter === f ? ORANGE : "#fff",
              color: filter === f ? "#fff" : INK_MID,
              fontSize: "0.85rem",
              fontWeight: filter === f ? 700 : 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow: filter === f ? "0 4px 12px rgba(234,88,12,0.2)" : "0 1px 3px rgba(0,0,0,0.05)",
              transition: "all 0.2s"
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ 
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
        gap: "1.5rem", padding: "0 1.5rem 4rem", maxWidth: 1000, margin: "0 auto" 
      }}>
        {filtered.map((company, i) => (
          <Link href={`/cities/${company.id}`} key={company.id} style={{ textDecoration: "none" }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, boxShadow: "0 12px 32px rgba(91,63,248,0.08)" }}
              style={{
                background: "#fff",
                borderRadius: 20,
                border: "1px solid rgba(91,63,248,0.1)",
                padding: "1.5rem",
                boxShadow: "0 4px 16px rgba(91,63,248,0.04)",
                transition: "all 0.2s",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxSizing: "border-box"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, background: PURPLE_XSOFT,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem"
                  }}>
                    {company.logo}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: INK, margin: "0 0 0.25rem" }}>{company.name}</h3>
                    <span style={{ 
                      fontSize: "0.7rem", fontWeight: 600, color: INK_MID, background: "#F1F5F9", 
                      padding: "0.2rem 0.5rem", borderRadius: 6 
                    }}>
                      {company.sector}
                    </span>
                  </div>
                </div>
                {company.hiring && (
                  <span style={{ 
                    background: GREEN_SOFT, color: GREEN, fontSize: "0.65rem", fontWeight: 800, 
                    padding: "0.25rem 0.5rem", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.05em"
                  }}>
                    Hiring
                  </span>
                )}
              </div>

              <p style={{ fontSize: "0.85rem", color: INK_LIGHT, lineHeight: 1.5, flex: 1, margin: "0 0 1.5rem" }}>
                {company.description}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #F1F5F9", paddingTop: "1rem" }}>
                <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: INK_MID, fontWeight: 500 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Users size={14} color={INK_LIGHT} /> {company.memberCount} members
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <LayoutGrid size={14} color={INK_LIGHT} /> {company.demos} demos
                  </div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center" }}>
                  {company.avatars.map((av, idx) => (
                    <div key={idx} style={{
                      width: 24, height: 24, borderRadius: "50%", background: `linear-gradient(135deg, ${PURPLE_LIGHT}, ${PURPLE})`,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 800, color: "#fff",
                      border: "2px solid #fff", marginLeft: idx === 0 ? 0 : -8, zIndex: 10 - idx
                    }}>
                      {av}
                    </div>
                  ))}
                  {company.memberCount > 4 && (
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%", background: "#F1F5F9",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700, color: INK_MID,
                      border: "2px solid #fff", marginLeft: -8, zIndex: 0
                    }}>
                      +{company.memberCount - 4}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
