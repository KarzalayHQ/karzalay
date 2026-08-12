"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Users,
  ArrowRight,
  Building2,
  Sparkles,
  Filter,
  ChevronRight,
  Globe,
  TrendingUp,
  Zap,
  X
} from "lucide-react";
import { Navbar } from "@/components/ui/Navbar";

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

/* ─── Mock Data ─── */
const MOCK_COMPANIES = [
  { id: "1", name: "Nexus UI", city: "Mumbai", memberCount: 12, sprintWeek: "W8", industry: "Design", trending: true },
  { id: "2", name: "CodeForge", city: "Delhi", memberCount: 9, sprintWeek: "W8", industry: "Backend", trending: false },
  { id: "3", name: "PixelPerfect", city: "Bengaluru", memberCount: 15, sprintWeek: "W8", industry: "Frontend", trending: true },
  { id: "4", name: "CloudSync", city: "Hyderabad", memberCount: 7, sprintWeek: "W7", industry: "DevOps", trending: false },
  { id: "5", name: "DataWeave", city: "Pune", memberCount: 11, sprintWeek: "W8", industry: "Data", trending: false },
  { id: "6", name: "ServerStack", city: "Chennai", memberCount: 8, sprintWeek: "W8", industry: "Backend", trending: false },
  { id: "7", name: "AppLaunch", city: "Kolkata", memberCount: 6, sprintWeek: "W7", industry: "Mobile", trending: false },
  { id: "8", name: "CyberShield", city: "Mumbai", memberCount: 10, sprintWeek: "W8", industry: "Security", trending: true },
  { id: "9", name: "MLWorks", city: "Delhi", memberCount: 13, sprintWeek: "W8", industry: "AI/ML", trending: true },
  { id: "10", name: "WebCraft", city: "Bengaluru", memberCount: 14, sprintWeek: "W8", industry: "Full Stack", trending: false },
  { id: "11", name: "BlockChainz", city: "Hyderabad", memberCount: 5, sprintWeek: "W7", industry: "Blockchain", trending: false },
  { id: "12", name: "TestPilot", city: "Pune", memberCount: 7, sprintWeek: "W8", industry: "QA", trending: false },
];

const INDUSTRIES = ["All", "Design", "Frontend", "Backend", "Full Stack", "DevOps", "Data", "AI/ML", "Mobile", "Security", "Blockchain", "QA"];

function Eyebrow({ children }) {
  return (
    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", ...gradientText, margin: 0 }}>
      {children}
    </p>
  );
}

/* ─── City Filter Pill ─── */
function CityPill({ city, selected, onClick, count }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: 999,
        border: "none",
        background: selected ? gradientBg : "#fff",
        color: selected ? "#fff" : INK_MID,
        fontSize: "0.82rem",
        fontWeight: selected ? 700 : 600,
        fontFamily: "inherit",
        cursor: "pointer",
        boxShadow: selected ? "0 4px 12px rgba(91,63,248,0.3)" : "0 1px 4px rgba(0,0,0,0.05)",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
      }}
    >
      {city}
      {count !== undefined && (
        <span style={{
          padding: "0.1rem 0.4rem",
          borderRadius: 999,
          background: selected ? "rgba(255,255,255,0.2)" : PURPLE_XSOFT,
          fontSize: "0.7rem",
          fontWeight: 700,
        }}>
          {count}
        </span>
      )}
    </motion.button>
  );
}

/* ─── Company Card ─── */
function CompanyCard({ company, index }) {
  const [hovered, setHovered] = useState(false);
  const initials = company.name.split(" ").map(w => w[0]).join("").slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6, rotateX: 4, rotateY: 2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        border: hovered ? "1.5px solid rgba(91,63,248,0.25)" : "1.5px solid rgba(91,63,248,0.08)",
        boxShadow: hovered ? cardShadowHover : cardShadow,
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.22s ease",
      }}
    >
      {/* Top gradient bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: gradientBg,
          transformOrigin: "left",
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{
          width: 52, height: 52, borderRadius: 16,
          background: hovered ? gradientBg : PURPLE_XSOFT,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.1rem", fontWeight: 800,
          color: hovered ? "#fff" : PURPLE,
          transition: "all 0.22s ease",
        }}>
          {initials}
        </div>
        {company.trending && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "0.25rem",
            padding: "0.25rem 0.6rem", borderRadius: 6,
            background: GREEN_SOFT, fontSize: "0.7rem", fontWeight: 700, color: GREEN,
          }}>
            <TrendingUp size={11} /> Trending
          </span>
        )}
      </div>

      <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: INK, margin: "0 0 0.35rem", letterSpacing: "-0.02em" }}>
        {company.name}
      </h3>

      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: INK_LIGHT, marginBottom: "0.75rem" }}>
        <MapPin size={14} />
        {company.city}
        <span style={{ color: "rgba(91,63,248,0.2)" }}>·</span>
        <span style={{ padding: "0.1rem 0.4rem", borderRadius: 4, background: PURPLE_XSOFT, fontSize: "0.7rem", fontWeight: 600, color: PURPLE }}>
          {company.industry}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.78rem", color: INK_MID, fontWeight: 600 }}>
            <Users size={13} color={INK_LIGHT} />
            {company.memberCount}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.78rem", color: INK_MID, fontWeight: 600 }}>
            <Zap size={13} color={PURPLE} />
            {company.sprintWeek}
          </div>
        </div>
        <motion.div
          animate={{ x: hovered ? 4 : 0 }}
          style={{ color: PURPLE }}
        >
          <ChevronRight size={18} />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   CITIES / COMPANIES PAGE
   ═══════════════════════════════════════════ */
export default function CitiesPage() {
  const [companies] = useState(MOCK_COMPANIES);
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const cities = useMemo(() => {
    const allCities = Array.from(new Set(companies.map(c => c.city))).sort();
    return ["All", ...allCities];
  }, [companies]);

  const cityCounts = useMemo(() => {
    const counts = {};
    companies.forEach(c => { counts[c.city] = (counts[c.city] || 0) + 1; });
    return counts;
  }, [companies]);

  const filtered = useMemo(() => {
    return companies.filter(c => {
      const matchesCity = selectedCity === "All" || c.city === selectedCity;
      const matchesIndustry = selectedIndustry === "All" || c.industry === selectedIndustry;
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCity && matchesIndustry && matchesSearch;
    });
  }, [companies, selectedCity, selectedIndustry, searchQuery]);

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #F5F3FF 0%, #fff 20%, #fff 80%, #F5F3FF 100%)",
        position: "relative",
      }}>
        {/* Decorative mesh */}
        <div style={{
          position: "fixed", inset: 0,
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(91,63,248,0.05) 0%, transparent 60%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", marginBottom: "2.5rem" }}
          >
            <Eyebrow>Directory</Eyebrow>
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 800, color: INK, letterSpacing: "-0.04em", margin: "0.5rem 0 0.75rem" }}>
              Browse <span style={gradientText}>Simulated Companies</span>
            </h1>
            <p style={{ fontSize: "1rem", color: INK_MID, maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
              Join a company that matches your interests. Work on real projects, earn credentials, and build your portfolio.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ maxWidth: 500, margin: "0 auto 2rem", position: "relative" }}
          >
            <Search size={18} color={INK_LIGHT} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 2 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search companies by name or city..."
              style={{
                width: "100%",
                padding: "0.9rem 1rem 0.9rem 2.75rem",
                borderRadius: 14,
                border: "1.5px solid rgba(91,63,248,0.15)",
                background: "#fff",
                color: INK,
                fontSize: "0.9rem",
                fontFamily: "inherit",
                outline: "none",
                boxShadow: "0 2px 12px rgba(91,63,248,0.07)",
                boxSizing: "border-box",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: INK_LIGHT, padding: 4 }}
              >
                <X size={16} />
              </button>
            )}
          </motion.div>

          {/* City Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ marginBottom: "1.5rem" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              <MapPin size={14} color={INK_LIGHT} />
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: INK_MID }}>Filter by city</span>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {cities.map(city => (
                <CityPill
                  key={city}
                  city={city}
                  selected={selectedCity === city}
                  onClick={() => setSelectedCity(city)}
                  count={city === "All" ? companies.length : cityCounts[city] || 0}
                />
              ))}
            </div>
          </motion.div>

          {/* Industry Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: "2rem" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              <Filter size={14} color={INK_LIGHT} />
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: INK_MID }}>Industry</span>
            </div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {INDUSTRIES.map(ind => (
                <button
                  key={ind}
                  onClick={() => setSelectedIndustry(ind)}
                  style={{
                    padding: "0.35rem 0.75rem",
                    borderRadius: 8,
                    border: "none",
                    background: selectedIndustry === ind ? PURPLE_XSOFT : "transparent",
                    color: selectedIndustry === ind ? PURPLE : INK_LIGHT,
                    fontSize: "0.78rem",
                    fontWeight: selectedIndustry === ind ? 700 : 500,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {ind}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results count */}
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.85rem", color: INK_LIGHT, margin: 0 }}>
              Showing <strong style={{ color: INK }}>{filtered.length}</strong> companies
              {selectedCity !== "All" && <> in <strong style={{ color: INK }}>{selectedCity}</strong></>}
              {selectedIndustry !== "All" && <> · <strong style={{ color: INK }}>{selectedIndustry}</strong></>}
            </p>
          </div>

          {/* Company Grid */}
          {filtered.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
              {filtered.map((company, i) => (
                <CompanyCard key={company.id} company={company} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: "center", padding: "4rem 2rem" }}
            >
              <Building2 size={48} color={INK_LIGHT} style={{ opacity: 0.3, margin: "0 auto 1rem" }} />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: INK_MID, margin: "0 0 0.5rem" }}>No companies found</h3>
              <p style={{ fontSize: "0.85rem", color: INK_LIGHT, margin: 0 }}>Try adjusting your filters or search query.</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
