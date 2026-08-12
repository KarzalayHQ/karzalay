'use client';

/* ═══════════════════════════════════════════
 * File: app/cities/[id]/page.tsx
 * Purpose: Displays detailed information about a specific company/cohort in a city.
 * Design Decisions:
 * - Hardcoded styles and INK/PURPLE tokens used directly to mimic the landing page look.
 * - Horizontal scrolling for the team members to save vertical space.
 * Tokens Used:
 * - Purples (PURPLE, PURPLE_SOFT, PURPLE_XSOFT)
 * - Oranges (ORANGE) for accent headers.
 * Component Connections:
 * - Uses the global Navbar.
 * - Links to /apply for specific roles.
 * ═══════════════════════════════════════════ */

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { ArrowLeft, Users, LayoutGrid, Calendar, Code2, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PURPLE = "#5B3FF8";
const PURPLE_SOFT = "#EDE9FE";
const PURPLE_XSOFT = "#F5F3FF";
const INK = "#1A1040";
const INK_MID = "#3D3A5C";
const INK_LIGHT = "#6B6887";
const GREEN = "#16A34A";
const GREEN_SOFT = "#DCFCE7";
const ORANGE = "#EA580C";

const COMPANIES_DATA: Record<string, any> = {
  'raasta-maps': {
    name: 'Raasta Maps',
    logo: '🗺️',
    hiring: true,
    description: 'Turn-by-turn navigation built for Indian roads.',
    memberCount: 14,
    demos: 47,
    founded: 'Jan 2025',
    sector: 'Navigation & Mapping',
    about: [
      "Raasta Maps is building India's most reliable motorcycle navigation app. We focus on road-quality-aware routing, real-time hazard alerts, and ride tracking for two-wheeler riders.",
      "Our team builds a React Native mobile app with Mapbox integration, a Node.js backend with real-time socket communication, and a data pipeline that processes road quality data from thousands of daily riders."
    ],
    techStack: ['React Native', 'Node.js', 'Mapbox', 'MongoDB', 'Socket.io', 'Redis'],
    team: [
      { name: 'Mriganshu Bora', role: 'Founder & Lead Developer', attendance: 98, commits: 512, avatar: 'M', id: 'kz-mriganshu-bora' },
      { name: 'Priya Deshmukh', role: 'Frontend Developer', attendance: 94, commits: 247, avatar: 'P', id: 'kz-priya-deshmukh' },
      { name: 'Arjun Nair', role: 'Backend Developer', attendance: 91, commits: 198, avatar: 'A', id: 'kz-arjun-nair' },
      { name: 'Neha Kapoor', role: 'Mobile Developer', attendance: 96, commits: 231, avatar: 'N', id: 'kz-neha-kapoor' }
    ],
    openRoles: [
      {
        title: 'Frontend Developer',
        type: 'Full-time',
        description: 'Build and maintain the Raasta Maps mobile app using React Native. Work on map rendering, navigation UI, and ride tracking features.',
        requirements: [
          'Familiarity with React or React Native',
          'Basic understanding of mobile app development',
          'Willingness to learn Mapbox SDK',
          'Available for daily standups at 10 AM IST'
        ]
      },
      {
        title: 'Backend Developer',
        type: 'Full-time',
        description: 'Design and build REST APIs, real-time socket services, and data pipelines for the Raasta platform.',
        requirements: [
          'Knowledge of Node.js or any backend framework',
          'Understanding of databases (SQL or NoSQL)',
          'Interest in real-time systems',
          'Available for daily standups at 10 AM IST'
        ]
      }
    ]
  }
};

export default function CompanyPage() {
  const params = useParams();
  const companyId = params.id as string;
  const company = COMPANIES_DATA[companyId] || COMPANIES_DATA['raasta-maps']; // fallback for preview
  const [teamIndex, setTeamIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (idx: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: idx * containerRef.current.clientWidth,
        behavior: 'smooth'
      });
      setTeamIndex(idx);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    setTeamIndex(index);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA", fontFamily: "Inter, sans-serif" }}>
      <Navbar />
      
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>
        {/* Back Link */}
        <Link href="/cities" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: INK_LIGHT, textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, marginBottom: "2rem", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = PURPLE} onMouseLeave={e => e.currentTarget.style.color = INK_LIGHT}>
          <ArrowLeft size={16} /> All companies
        </Link>

        {/* Hero */}
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div style={{
            width: 72, height: 72, borderRadius: 16, background: "#fff", border: "1px solid rgba(91,63,248,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", boxShadow: "0 4px 12px rgba(91,63,248,0.05)"
          }}>
            {company.logo}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
              <h1 style={{ fontSize: "2rem", fontWeight: 800, color: INK, margin: 0, letterSpacing: "-0.04em" }}>{company.name}</h1>
              {company.hiring && (
                <span style={{ 
                  background: GREEN_SOFT, color: GREEN, fontSize: "0.7rem", fontWeight: 800, 
                  padding: "0.25rem 0.6rem", borderRadius: 999, textTransform: "uppercase", letterSpacing: "0.05em"
                }}>
                  Hiring
                </span>
              )}
            </div>
            <p style={{ fontSize: "1rem", color: INK_MID, margin: 0 }}>{company.description}</p>
          </div>
        </div>

        {/* Meta Stats */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginBottom: "3rem", fontSize: "0.85rem", color: INK_LIGHT, fontWeight: 500 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Users size={16} /> {company.memberCount} members</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><LayoutGrid size={16} /> {company.demos} shipped</div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}><Calendar size={16} /> Founded {company.founded}</div>
          <div style={{ background: "#F1F5F9", padding: "0.25rem 0.6rem", borderRadius: 6, fontWeight: 600, color: INK_MID }}>{company.sector}</div>
        </div>

        {/* About Section */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: INK, margin: "0 0 1rem" }}>About</h2>
          <div style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", border: "1px solid rgba(91,63,248,0.1)", boxShadow: "0 4px 16px rgba(91,63,248,0.04)" }}>
            {company.about.map((p: string, i: number) => (
              <p key={i} style={{ fontSize: "0.95rem", color: INK_MID, lineHeight: 1.6, margin: i === company.about.length - 1 ? 0 : "0 0 1rem" }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: INK, margin: "0 0 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Code2 size={20} color={ORANGE} /> Tech Stack
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {company.techStack.map((tech: string) => (
              <span key={tech} style={{ 
                background: "#fff", border: "1px solid rgba(91,63,248,0.15)", color: INK_MID, 
                padding: "0.4rem 0.85rem", borderRadius: 999, fontSize: "0.85rem", fontWeight: 600, boxShadow: "0 2px 8px rgba(91,63,248,0.03)"
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: INK, margin: "0 0 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Users size={20} color={ORANGE} /> Team
          </h2>
          <div style={{ position: "relative", padding: "4px 0" }}>
            <div 
              ref={containerRef}
              onScroll={handleScroll}
              className="hide-scrollbar"
              style={{ 
                display: "flex", 
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                scrollBehavior: "smooth",
                gap: "1rem",
                padding: "8px 4px",
                margin: "-4px 0"
              }}
            >
              {company.team.map((member: any) => (
                <div key={member.name} style={{ width: "100%", flexShrink: 0, scrollSnapAlign: "start", padding: "4px 2px" }}>
                  <Link href={`/profile/${member.id}`} style={{ textDecoration: "none", display: "block" }}>
                    <div style={{ 
                      background: "#fff", 
                      border: "1px solid rgba(91,63,248,0.1)", 
                      borderRadius: 16, 
                      padding: "1.25rem", 
                      display: "flex", 
                      gap: "1rem", 
                      alignItems: "center", 
                      boxShadow: "0 4px 12px rgba(91,63,248,0.03)",
                      transition: "border-color 0.2s, transform 0.2s",
                      cursor: "pointer"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = PURPLE;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "rgba(91,63,248,0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                    >
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: PURPLE_XSOFT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", fontWeight: 800, color: PURPLE, flexShrink: 0 }}>
                        {member.avatar}
                      </div>
                      <div>
                        <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: INK, margin: "0 0 0.15rem" }}>{member.name}</h4>
                        <p style={{ fontSize: "0.8rem", color: INK_LIGHT, margin: "0 0 0.4rem" }}>{member.role}</p>
                        <div style={{ display: "flex", gap: "0.75rem", fontSize: "0.75rem", color: INK_MID, fontWeight: 500 }}>
                          <span>{member.attendance}% attendance</span>
                          <span>{member.commits} commits</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1rem" }}>
            {company.team.map((_: any, idx: number) => (
              <button 
                key={idx} 
                onClick={() => scrollToSlide(idx)} 
                style={{ width: 8, height: 8, borderRadius: "50%", background: teamIndex === idx ? PURPLE : "rgba(91,63,248,0.2)", border: "none", cursor: "pointer", padding: 0 }} 
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Open Roles */}
        <div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: INK, margin: "0 0 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <LayoutGrid size={20} color={ORANGE} /> Open Roles
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {company.openRoles.map((role: any) => (
              <div key={role.title} style={{ background: "#fff", border: "1px solid rgba(91,63,248,0.1)", borderRadius: 16, padding: "2rem", boxShadow: "0 4px 16px rgba(91,63,248,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: INK, margin: "0 0 0.5rem" }}>{role.title}</h3>
                    <span style={{ background: "#F1F5F9", color: INK_MID, fontSize: "0.75rem", fontWeight: 700, padding: "0.25rem 0.6rem", borderRadius: 6 }}>
                      {role.type}
                    </span>
                  </div>
                  <Link href={`/apply?company=${companyId}&role=${encodeURIComponent(role.title)}`} style={{ 
                    background: ORANGE, color: "#fff", textDecoration: "none", padding: "0.6rem 1.25rem", borderRadius: 8, 
                    fontSize: "0.9rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 4px 12px rgba(234,88,12,0.2)" 
                  }}>
                    Apply for this role <ArrowRight size={16} />
                  </Link>
                </div>
                
                <p style={{ fontSize: "0.95rem", color: INK_MID, lineHeight: 1.6, marginBottom: "1.5rem" }}>{role.description}</p>
                
                <div>
                  <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: INK, margin: "0 0 0.75rem" }}>Requirements</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {role.requirements.map((req: string, idx: number) => (
                      <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.85rem", color: INK_MID, lineHeight: 1.5 }}>
                        <CheckCircle2 size={16} color={GREEN} style={{ marginTop: "0.15rem", flexShrink: 0 }} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
