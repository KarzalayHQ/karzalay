"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Plus, 
  Check, 
  Copy, 
  Cpu, 
  Layers, 
  Activity, 
  TrendingUp, 
  ArrowRight,
  RefreshCw,
  Terminal,
  ArrowUpRight,
  Shield,
  Briefcase,
  Users,
  ExternalLink
} from "lucide-react";
import styles from "./previews.module.css";

// 13 Design System Theme Keys
type ThemeKey = 
  | "google-minimalist" 
  | "dev-precision" 
  | "warm-organic" 
  | "cyber-stripe"
  | "nordic-functionalist"
  | "academic-renaissance"
  | "high-fashion-swiss"
  | "neo-renaissance-gold"
  | "cyber-glow"
  | "aero-grid"
  | "academic-purple-amethyst"
  | "academic-purple-indigo"
  | "academic-purple-sunset";

interface ThemeConfig {
  key: ThemeKey;
  className: string;
  name: string;
  desc: string;
  palette: Array<{ name: string; hex: string; variable: string }>;
  typography: Array<{ level: string; font: string; size: string; weight: string }>;
}

const THEMES: Record<ThemeKey, ThemeConfig> = {
  "google-minimalist": {
    key: "google-minimalist",
    className: "", // root default variables
    name: "Google Minimalist",
    desc: "Clean geometric sans with massive whitespace, crisp Material feel.",
    palette: [
      { name: "Primary Brand", hex: "#2B4CFF", variable: "--color-primary" }, // Electric Cobalt
      { name: "Secondary Slate", hex: "#475569", variable: "--color-secondary" },
      { name: "Background Off-White", hex: "#F8F9FA", variable: "--color-background" },
      { name: "Surface Card", hex: "#FFFFFF", variable: "--color-surface" },
      { name: "Border Line", hex: "#E2E8F0", variable: "--color-border" },
      { name: "Text Main", hex: "#1E293B", variable: "--color-text-primary" },
      { name: "Text Slate", hex: "#64748B", variable: "--color-text-secondary" }
    ],
    typography: [
      { level: "H1 Heading", font: "Plus Jakarta Sans Bold", size: "64px / 4rem", weight: "700" },
      { level: "H2 Section", font: "Plus Jakarta Sans SemiBold", size: "44px / 2.75rem", weight: "600" },
      { level: "H3 Card", font: "Plus Jakarta Sans SemiBold", size: "28px / 1.75rem", weight: "600" },
      { level: "Body Text", font: "Plus Jakarta Sans Regular", size: "16px / 1rem", weight: "400" },
      { level: "Label / Tag", font: "Plus Jakarta Sans Medium", size: "12px / 0.75rem", weight: "500" }
    ]
  },
  "dev-precision": {
    key: "dev-precision",
    className: "theme-dev-precision",
    name: "Dev Precision",
    desc: "High-density developer dashboard styling. Space Grotesk and Inter.",
    palette: [
      { name: "Primary Teal", hex: "#0D9488", variable: "--color-primary" },
      { name: "Secondary Violet", hex: "#6366F1", variable: "--color-secondary" },
      { name: "Background Light-Grey", hex: "#FAFAFA", variable: "--color-background" },
      { name: "Surface Card", hex: "#FFFFFF", variable: "--color-surface" },
      { name: "Border Fine", hex: "#E5E7EB", variable: "--color-border" },
      { name: "Text Blackout", hex: "#09090B", variable: "--color-text-primary" },
      { name: "Text Zinc", hex: "#71717A", variable: "--color-text-secondary" }
    ],
    typography: [
      { level: "H1 Heading", font: "Space Grotesk Bold", size: "60px / 3.75rem", weight: "700" },
      { level: "H2 Section", font: "Space Grotesk SemiBold", size: "40px / 2.5rem", weight: "600" },
      { level: "H3 Card", font: "Space Grotesk SemiBold", size: "24px / 1.5rem", weight: "600" },
      { level: "Body Text", font: "Inter Regular", size: "15px / 0.95rem", weight: "400" },
      { level: "Label / Tag", font: "Inter Medium", size: "11px / 0.7rem", weight: "500" }
    ]
  },
  "warm-organic": {
    key: "warm-organic",
    className: "theme-warm-organic",
    name: "Warm Organic",
    desc: "Frosted-glass editorial with warm ivory backdrops and Playfair Display.",
    palette: [
      { name: "Primary Sage", hex: "#0F766E", variable: "--color-primary" },
      { name: "Warm Amber", hex: "#D97706", variable: "--color-secondary" },
      { name: "Warm Alabaster", hex: "#FCFBF7", variable: "--color-background" },
      { name: "Glass Surface", hex: "rgba(255,255,255,0.7)", variable: "--color-surface" },
      { name: "Organic Line", hex: "rgba(0,0,0,0.05)", variable: "--color-border" },
      { name: "Text Cocoa", hex: "#2C2520", variable: "--color-text-primary" },
      { name: "Text Stone", hex: "#7F736A", variable: "--color-text-secondary" }
    ],
    typography: [
      { level: "H1 Heading", font: "Playfair Display Light", size: "72px / 4.5rem", weight: "300" },
      { level: "H2 Section", font: "Playfair Display Regular", size: "48px / 3rem", weight: "400" },
      { level: "H3 Card", font: "Playfair Display Regular", size: "30px / 1.85rem", weight: "400" },
      { level: "Body Text", font: "Outfit Light", size: "17px / 1.05rem", weight: "300" },
      { level: "Label / Tag", font: "Outfit Medium", size: "12.4px / 0.77rem", weight: "500" }
    ]
  },
  "cyber-stripe": {
    key: "cyber-stripe",
    className: "theme-cyber-stripe",
    name: "Cyber Stripe",
    desc: "Stripe-inspired corporate developer environment. Bold Outfit headers.",
    palette: [
      { name: "Primary Indigo", hex: "#4F46E5", variable: "--color-primary" },
      { name: "Electric Cyan", hex: "#06B6D4", variable: "--color-secondary" },
      { name: "Background slate", hex: "#F3F4F6", variable: "--color-background" },
      { name: "Surface Card", hex: "#FFFFFF", variable: "--color-surface" },
      { name: "Solid Border", hex: "#D1D5DB", variable: "--color-border" },
      { name: "Text Charcoal", hex: "#111827", variable: "--color-text-primary" },
      { name: "Text Slate", hex: "#4B5563", variable: "--color-text-secondary" }
    ],
    typography: [
      { level: "H1 Heading", font: "Outfit ExtraBold", size: "64px / 4rem", weight: "800" },
      { level: "H2 Section", font: "Outfit Bold", size: "44px / 2.75rem", weight: "700" },
      { level: "H3 Card", font: "Outfit SemiBold", size: "26px / 1.65rem", weight: "600" },
      { level: "Body Text", font: "Inter Regular", size: "15.6px / 0.97rem", weight: "400" },
      { level: "Label / Tag", font: "Inter SemiBold", size: "11.6px / 0.72rem", weight: "600" }
    ]
  },
  "nordic-functionalist": {
    key: "nordic-functionalist",
    className: "theme-nordic-functionalist",
    name: "Nordic Minimal",
    desc: "Pure clean aesthetic, circular pill indicators, teal forest accents.",
    palette: [
      { name: "Primary Emerald", hex: "#059669", variable: "--color-primary" },
      { name: "Forest Zinc", hex: "#71717A", variable: "--color-secondary" },
      { name: "Clean Zinc", hex: "#F4F4F5", variable: "--color-background" },
      { name: "Surface Card", hex: "#FFFFFF", variable: "--color-surface" },
      { name: "Soft Zinc Border", hex: "#E4E4E7", variable: "--color-border" },
      { name: "Text Pitch Zinc", hex: "#18181B", variable: "--color-text-primary" },
      { name: "Text Zinc Grey", hex: "#71717A", variable: "--color-text-secondary" }
    ],
    typography: [
      { level: "H1 Heading", font: "Outfit Bold", size: "60px / 3.8rem", weight: "700" },
      { level: "H2 Section", font: "Outfit SemiBold", size: "42px / 2.6rem", weight: "600" },
      { level: "H3 Card", font: "Outfit SemiBold", size: "27px / 1.7rem", weight: "600" },
      { level: "Body Text", font: "Outfit Regular", size: "16px / 1rem", weight: "400" },
      { level: "Label / Tag", font: "Outfit Medium", size: "12px / 0.75rem", weight: "500" }
    ]
  },
  "academic-renaissance": {
    key: "academic-renaissance",
    className: "theme-academic-renaissance",
    name: "Academic Notion",
    desc: "Scholarly warm ivory backdrops, elegant Lora serif headers.",
    palette: [
      { name: "Primary Crimson", hex: "#991B1B", variable: "--color-primary" },
      { name: "Oxford Blue", hex: "#1E3A8A", variable: "--color-secondary" },
      { name: "Warm Ivory", hex: "#FCFCFA", variable: "--color-background" },
      { name: "Surface Card", hex: "#FFFFFF", variable: "--color-surface" },
      { name: "Light Border", hex: "#E5E7EB", variable: "--color-border" },
      { name: "Text Ink Black", hex: "#111827", variable: "--color-text-primary" },
      { name: "Text Steel", hex: "#4B5563", variable: "--color-text-secondary" }
    ],
    typography: [
      { level: "H1 Heading", font: "Lora Bold", size: "68px / 4.25rem", weight: "700" },
      { level: "H2 Section", font: "Lora SemiBold", size: "45px / 2.85rem", weight: "600" },
      { level: "H3 Card", font: "Lora SemiBold", size: "28px / 1.8rem", weight: "600" },
      { level: "Body Text", font: "Inter Regular", size: "16.4px / 1.02rem", weight: "400" },
      { level: "Label / Tag", font: "Inter Medium", size: "12px / 0.75rem", weight: "500" }
    ]
  },
  "high-fashion-swiss": {
    key: "high-fashion-swiss",
    className: "theme-high-fashion-swiss",
    name: "Fashion Swiss",
    desc: "Ultra-minimal editorial brutalism, sharp 0px corners, bold Syne headers.",
    palette: [
      { name: "Primary Cobalt", hex: "#2B4CFF", variable: "--color-primary" },
      { name: "Pitch Black", hex: "#18181B", variable: "--color-secondary" },
      { name: "Fashion Grey", hex: "#FAFAFA", variable: "--color-background" },
      { name: "Surface Card", hex: "#FFFFFF", variable: "--color-surface" },
      { name: "Solid Divider", hex: "#D4D4D8", variable: "--color-border" },
      { name: "Text Pure Black", hex: "#000000", variable: "--color-text-primary" },
      { name: "Text Zinc Grey", hex: "#52525B", variable: "--color-text-secondary" }
    ],
    typography: [
      { level: "H1 Heading", font: "Syne ExtraBold", size: "72px / 4.5rem", weight: "800" },
      { level: "H2 Section", font: "Syne Bold", size: "51px / 3.2rem", weight: "700" },
      { level: "H3 Card", font: "Syne SemiBold", size: "30px / 1.9rem", weight: "600" },
      { level: "Body Text", font: "Inter Regular", size: "15.2px / 0.95rem", weight: "400" },
      { level: "Label / Tag", font: "Inter Bold", size: "11.6px / 0.72rem", weight: "700" }
    ]
  },
  "neo-renaissance-gold": {
    key: "neo-renaissance-gold",
    className: "theme-neo-renaissance-gold",
    name: "Luxury Gold",
    desc: "Luxury Rose Gold secondary, soft cream backdrops, warm drop shadows.",
    palette: [
      { name: "Primary Amber", hex: "#B45309", variable: "--color-primary" },
      { name: "Champagne Pink", hex: "#DB2777", variable: "--color-secondary" },
      { name: "Paper Cream", hex: "#FAF9F5", variable: "--color-background" },
      { name: "Surface Card", hex: "#FFFFFF", variable: "--color-surface" },
      { name: "Paper Border", hex: "#EAE7E1", variable: "--color-border" },
      { name: "Text Warm Cocoa", hex: "#1C1917", variable: "--color-text-primary" },
      { name: "Text Warm Stone", hex: "#78716C", variable: "--color-text-secondary" }
    ],
    typography: [
      { level: "H1 Heading", font: "Playfair Display Light", size: "68px / 4.25rem", weight: "300" },
      { level: "H2 Section", font: "Playfair Display Regular", size: "45px / 2.85rem", weight: "400" },
      { level: "H3 Card", font: "Playfair Display Regular", size: "28px / 1.75rem", weight: "400" },
      { level: "Body Text", font: "Outfit Light", size: "16px / 1rem", weight: "300" },
      { level: "Label / Tag", font: "Outfit Medium", size: "12px / 0.75rem", weight: "500" }
    ]
  },
  "cyber-glow": {
    key: "cyber-glow",
    className: "theme-cyber-glow",
    name: "Web3 Glow",
    desc: "Cyberpunk Web3 developer deck. Glowing cyan borders, Space Grotesk.",
    palette: [
      { name: "Primary Violet", hex: "#8B5CF6", variable: "--color-primary" },
      { name: "Neon Mint", hex: "#10B981", variable: "--color-secondary" },
      { name: "Background Ice", hex: "#F8FAFC", variable: "--color-background" },
      { name: "Surface Card", hex: "#FFFFFF", variable: "--color-surface" },
      { name: "Ice Border", hex: "#E2E8F0", variable: "--color-border" },
      { name: "Text Ink Navy", hex: "#0F172A", variable: "--color-text-primary" },
      { name: "Text Slate Grey", hex: "#475569", variable: "--color-text-secondary" }
    ],
    typography: [
      { level: "H1 Heading", font: "Space Grotesk ExtraBold", size: "66px / 4.15rem", weight: "800" },
      { level: "H2 Section", font: "Space Grotesk Bold", size: "44px / 2.75rem", weight: "700" },
      { level: "H3 Card", font: "Space Grotesk SemiBold", size: "27px / 1.7rem", weight: "600" },
      { level: "Body Text", font: "Inter Regular", size: "15.6px / 0.98rem", weight: "400" },
      { level: "Label / Tag", font: "Inter SemiBold", size: "11.6px / 0.72rem", weight: "600" }
    ]
  },
  "aero-grid": {
    key: "aero-grid",
    className: "theme-aero-grid",
    name: "Aero Designer",
    desc: "Precision workbench layout, electric blue accents, Clash Display.",
    palette: [
      { name: "Primary Blue", hex: "#3B82F6", variable: "--color-primary" },
      { name: "Secondary Slate", hex: "#4B5563", variable: "--color-secondary" },
      { name: "Background Cool", hex: "#F8FAFC", variable: "--color-background" },
      { name: "Surface Card", hex: "#FFFFFF", variable: "--color-surface" },
      { name: "Soft Grey Border", hex: "#E2E8F0", variable: "--color-border" },
      { name: "Text Ink Navy", hex: "#0F172A", variable: "--color-text-primary" },
      { name: "Text Muted Slate", hex: "#64748B", variable: "--color-text-secondary" }
    ],
    typography: [
      { level: "H1 Heading", font: "Outfit ExtraBold", size: "68px / 4.25rem", weight: "800" },
      { level: "H2 Section", font: "Outfit SemiBold", size: "45px / 2.85rem", weight: "600" },
      { level: "H3 Card", font: "Outfit SemiBold", size: "28px / 1.75rem", weight: "600" },
      { level: "Body Text", font: "Plus Jakarta Sans Medium", size: "15.6px / 0.975rem", weight: "500" },
      { level: "Label / Tag", font: "Plus Jakarta Sans SemiBold", size: "12px / 0.75rem", weight: "600" }
    ]
  },
  "academic-purple-amethyst": {
    key: "academic-purple-amethyst",
    className: "theme-academic-purple-amethyst",
    name: "Academic Amethyst",
    desc: "Royal Amethyst Purple & vibrant Plum on a soft, premium Lavender Alabaster texture background.",
    palette: [
      { name: "Primary Amethyst", hex: "#7C3AED", variable: "--color-primary" },
      { name: "Plum Accent", hex: "#D946EF", variable: "--color-secondary" },
      { name: "Lavender Alabaster", hex: "#FAF8FC", variable: "--color-background" },
      { name: "Surface Card", hex: "#FFFFFF", variable: "--color-surface" },
      { name: "Soft Border", hex: "#EAE5F3", variable: "--color-border" },
      { name: "Text Deep Ink", hex: "#1E1B29", variable: "--color-text-primary" },
      { name: "Text Slate Purple", hex: "#5C5870", variable: "--color-text-secondary" }
    ],
    typography: [
      { level: "H1 Heading", font: "Lora Bold", size: "68px / 4.25rem", weight: "700" },
      { level: "H2 Section", font: "Lora SemiBold", size: "45px / 2.85rem", weight: "600" },
      { level: "H3 Card", font: "Lora SemiBold", size: "28px / 1.8rem", weight: "600" },
      { level: "Body Text", font: "Inter Regular", size: "16.4px / 1.02rem", weight: "400" },
      { level: "Label / Tag", font: "Inter Medium", size: "12px / 0.75rem", weight: "500" }
    ]
  },
  "academic-purple-indigo": {
    key: "academic-purple-indigo",
    className: "theme-academic-purple-indigo",
    name: "Academic Indigo",
    desc: "Oxford Indigo-Purple & radiant Violet accents resting on a warm Silk Paper backing texture.",
    palette: [
      { name: "Primary Indigo", hex: "#4F46E5", variable: "--color-primary" },
      { name: "Violet Accent", hex: "#8B5CF6", variable: "--color-secondary" },
      { name: "Warm Silk Paper", hex: "#FCFBFE", variable: "--color-background" },
      { name: "Surface Card", hex: "#FFFFFF", variable: "--color-surface" },
      { name: "Fine Border", hex: "#E8E7EC", variable: "--color-border" },
      { name: "Text Indigo Ink", hex: "#181620", variable: "--color-text-primary" },
      { name: "Text Purple Slate", hex: "#585662", variable: "--color-text-secondary" }
    ],
    typography: [
      { level: "H1 Heading", font: "Lora Bold", size: "68px / 4.25rem", weight: "700" },
      { level: "H2 Section", font: "Lora SemiBold", size: "45px / 2.85rem", weight: "600" },
      { level: "H3 Card", font: "Lora SemiBold", size: "28px / 1.8rem", weight: "600" },
      { level: "Body Text", font: "Inter Regular", size: "16.4px / 1.02rem", weight: "400" },
      { level: "Label / Tag", font: "Inter Medium", size: "12px / 0.75rem", weight: "500" }
    ]
  },
  "academic-purple-sunset": {
    key: "academic-purple-sunset",
    className: "theme-academic-purple-sunset",
    name: "Academic Sunset",
    desc: "Deep Sunset Violet & Sunset Rose on a textured, premium Warm Linen/Parchment canvas.",
    palette: [
      { name: "Primary Sunset", hex: "#6D28D9", variable: "--color-primary" },
      { name: "Sunset Rose", hex: "#EC4899", variable: "--color-secondary" },
      { name: "Warm Linen Parchment", hex: "#FAF7F2", variable: "--color-background" },
      { name: "Surface Card", hex: "#FFFFFF", variable: "--color-surface" },
      { name: "Parchment Border", hex: "#EDE4E2", variable: "--color-border" },
      { name: "Text Plum Charcoal", hex: "#261E2E", variable: "--color-text-primary" },
      { name: "Text Warm Slate", hex: "#756A7A", variable: "--color-text-secondary" }
    ],
    typography: [
      { level: "H1 Heading", font: "Lora Bold", size: "68px / 4.25rem", weight: "700" },
      { level: "H2 Section", font: "Lora SemiBold", size: "45px / 2.85rem", weight: "600" },
      { level: "H3 Card", font: "Lora SemiBold", size: "28px / 1.8rem", weight: "600" },
      { level: "Body Text", font: "Inter Regular", size: "16.4px / 1.02rem", weight: "400" },
      { level: "Label / Tag", font: "Inter Medium", size: "12px / 0.75rem", weight: "500" }
    ]
  }
};

const MOCK_COMPANY_NAMES = ["Apex Corp", "Nova Labs", "Aegis Inc", "Spectral AI", "Hyperion", "Helios Co"];
const MOCK_STATS = ["$12M Valuation", "98% Uptime", "$450k ARR", "12 Agent Seats", "Live 24/7"];

interface AgentNode {
  id: number;
  name: string;
  stat: string;
  x: number;
  y: number;
}

interface TransactionItem {
  id: number;
  agent: string;
  amount: string;
  action: string;
  time: string;
}

export default function PreviewsPage() {
  const [activeTheme, setActiveTheme] = useState<ThemeKey>("google-minimalist");
  const [inspectorFormat, setInspectorFormat] = useState<"css" | "json">("css");
  
  // Sandbox AI simulator state
  const [agents, setAgents] = useState<AgentNode[]>([
    { id: 1, name: "Nexus Protocol", stat: "Active · $12M TVL", x: 25, y: 35 },
    { id: 2, name: "Aura Net", stat: "Running · 100k TPS", x: 70, y: 55 },
    { id: 3, name: "Oasis VR", stat: "Synced · 50k Users", x: 45, y: 75 }
  ]);
  
  // Dynamic Real-time Transaction Ledger state
  const [transactions, setTransactions] = useState<TransactionItem[]>([
    { id: 1, agent: "Agent 0x3F", action: "allocated liquidity bounds on", amount: "$240,000", time: "Just now" },
    { id: 2, agent: "Agent 0x9B", action: "acquired partial equity nodes in", amount: "1.2%", time: "1 min ago" },
    { id: 3, agent: "Agent 0x6A", action: "routed system standup demos to", amount: "Nexus", time: "3 mins ago" },
    { id: 4, agent: "Agent 0x1E", action: "issued capital asset invoices to", amount: "$12,400", time: "5 mins ago" }
  ]);

  // Tab View state for lead dashboard vs member dashboard showcase
  const [activeTab, setActiveTab] = useState<"lead" | "member">("lead");
  const [copied, setCopied] = useState(false);

  // Spawns a floating AI company node in the simulator console
  const handleSpawnAgent = () => {
    const randomName = MOCK_COMPANY_NAMES[Math.floor(Math.random() * MOCK_COMPANY_NAMES.length)];
    const randomStat = MOCK_STATS[Math.floor(Math.random() * MOCK_STATS.length)];
    const newAgent: AgentNode = {
      id: Date.now(),
      name: `${randomName} #${Math.floor(Math.random() * 900 + 100)}`,
      stat: randomStat,
      x: Math.random() * 70 + 10,
      y: Math.random() * 65 + 15
    };
    
    setAgents(prev => {
      const updated = prev.length >= 6 ? prev.slice(1) : prev;
      return [...updated, newAgent];
    });
  };

  // Dynamically feed the Economic Ledger transaction ticker every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAgent = `Agent 0x${Math.floor(Math.random() * 90 + 10)}${String.fromCharCode(Math.floor(Math.random() * 6 + 65))}`;
      const actions = [
        "synced ledger transactional logs to", 
        "settled simulation invoices with", 
        "transferred corporate IP rights to",
        "spawned autonomous nodes inside"
      ];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomAmt = Math.random() > 0.5 
        ? `$${(Math.random() * 40 + 5).toFixed(1)}k` 
        : `${(Math.random() * 5 + 0.5).toFixed(1)}% Equity`;
      
      const newTx: TransactionItem = {
        id: Date.now(),
        agent: randomAgent,
        action: randomAction,
        amount: randomAmt,
        time: "Just now"
      };

      setTransactions(prev => [newTx, ...prev.slice(0, 5)]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const getTokensText = () => {
    const config = THEMES[activeTheme];
    if (inspectorFormat === "css") {
      return `/* Design Tokens — ${config.name} */
:root {
  /* Colors */
  ${config.palette.map(color => `${color.variable}: ${color.hex};`).join("\n  ")}
  
  /* Typography Family */
  --font-family-heading: var(--font-${
    activeTheme === "google-minimalist" 
      ? "plus-jakarta" 
      : activeTheme === "dev-precision" || activeTheme === "cyber-glow"
      ? "space-grotesk" 
      : activeTheme === "warm-organic" || activeTheme === "neo-renaissance-gold"
      ? "playfair" 
      : activeTheme === "academic-renaissance" || activeTheme.startsWith("academic-purple")
      ? "lora"
      : activeTheme === "high-fashion-swiss"
      ? "syne"
      : "outfit"
  });
  --font-family-body: var(--font-${
    activeTheme === "google-minimalist" || activeTheme === "nordic-functionalist" || activeTheme === "aero-grid"
      ? "plus-jakarta" 
      : activeTheme === "warm-organic" || activeTheme === "neo-renaissance-gold"
      ? "outfit" 
      : "inter"
  });
  
  /* Spacing Scale (8px Grid) */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-64: 64px;

  /* UI Parameters */
  --radius-card: ${
    activeTheme === "google-minimalist" 
      ? "16px" 
      : activeTheme === "dev-precision" 
      ? "6px" 
      : activeTheme === "warm-organic" 
      ? "28px" 
      : activeTheme === "cyber-stripe" 
      ? "12px" 
      : activeTheme === "nordic-functionalist"
      ? "24px"
      : activeTheme === "academic-renaissance" || activeTheme.startsWith("academic-purple")
      ? "8px"
      : activeTheme === "high-fashion-swiss"
      ? "0px"
      : activeTheme === "aero-grid"
      ? "14px"
      : "16px"
  };
  --radius-btn: ${
    activeTheme === "google-minimalist" 
      ? "8px" 
      : activeTheme === "dev-precision" 
      ? "4px" 
      : activeTheme === "warm-organic" || activeTheme === "nordic-functionalist"
      ? "9999px" 
      : activeTheme === "cyber-stripe" 
      ? "6px" 
      : activeTheme === "high-fashion-swiss"
      ? "0px"
      : activeTheme === "academic-renaissance" || activeTheme.startsWith("academic-purple")
      ? "6px"
      : "8px"
  };
  --border-weight: ${activeTheme === "high-fashion-swiss" ? "1.5px" : "1px"};
  --shadow-card: ${activeTheme === "high-fashion-swiss" ? "none" : "0 4px 20px rgba(0,0,0,0.03)"};
}`;
    } else {
      const spacingTokens = {
        "scale-4": "4px", "scale-8": "8px", "scale-12": "12px", "scale-16": "16px",
        "scale-24": "24px", "scale-32": "32px", "scale-48": "48px", "scale-64": "64px"
      };
      
      const themeExport = {
        themeName: config.name,
        system: "Karzalay Design System v2",
        palette: config.palette.reduce((acc, curr) => ({ ...acc, [curr.variable.replace("--color-", "")]: curr.hex }), {}),
        typography: {
          familyHeading: config.typography[0].font,
          familyBody: config.typography[3].font,
          scale: config.typography.reduce((acc, curr) => ({ ...acc, [curr.level.split(" ")[0].toLowerCase()]: curr.size }), {})
        },
        spacing: spacingTokens,
        styling: {
          radiusCard: activeTheme === "high-fashion-swiss" ? "0px" : activeTheme === "warm-organic" ? "28px" : activeTheme === "academic-renaissance" || activeTheme.startsWith("academic-purple") ? "8px" : "16px",
          radiusButton: activeTheme === "high-fashion-swiss" ? "0px" : activeTheme === "warm-organic" ? "9999px" : activeTheme === "academic-renaissance" || activeTheme.startsWith("academic-purple") ? "6px" : "8px",
          borderWeight: activeTheme === "high-fashion-swiss" ? "1.5px" : "1px"
        }
      };
      return JSON.stringify(themeExport, null, 2);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getTokensText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`ds-container ${styles.previewPage} ${THEMES[activeTheme].className}`}>
      
      {/* Background aesthetics */}
      <div className={styles.gridOverlay} />
      <div className={styles.glowAmbient} />

      <div className={styles.contentWrapper}>
        
        {/* Dynamic Nav Header */}
        <header className={styles.header}>
          <div className={`container ${styles.headerContainer}`}>
            <div className={styles.logo}>
              <div className={styles.logoMark} />
              <span className={styles.logoText}>Karzalay</span>
            </div>
            <nav className={styles.navLinks}>
              <a href="#hero" className={styles.navLink}>Platform</a>
              <a href="#ecosystem" className={styles.navLink}>Ecosystem</a>
              <a href="#ledger" className={styles.navLink}>Ledger</a>
              <a href="#dashboard" className={styles.navLink}>Console</a>
            </nav>
            <div className={styles.headerActions}>
              <a href="#dashboard" className={styles.navLink}>Dashboard</a>
              <button className={`ds-btn-primary ${styles.btnSm}`}>Join Sandbox</button>
            </div>
          </div>
        </header>

        {/* ==========================================================================
           TOP CONSOLE: DESIGN SYSTEM INSPECTOR & SWATCHES
           ========================================================================== */}
        <section className={`container ${styles.previewsConsoleSection}`}>
          
          {/* Active Colors Specs */}
          <div className={`ds-card ${styles.systemCard}`}>
            <div className={styles.badge} style={{ marginBottom: 12 }}>
              <Sparkles size={12} style={{ marginRight: 6, display: "inline-block", verticalAlign: "middle" }} />
              Karzalay Design Console v2
            </div>
            <h2 className={`ds-heading ${styles.systemTitle}`} style={{ fontSize: "var(--font-size-h2)", margin: "0 0 16px 0" }}>
              Active Theme: {THEMES[activeTheme].name}
            </h2>
            <p className="ds-body" style={{ color: "var(--color-text-secondary)", marginBottom: 24, fontSize: "var(--font-size-body)" }}>
              {THEMES[activeTheme].desc}
            </p>
            
            <div className={styles.paletteGrid}>
              {THEMES[activeTheme].palette.map((color, index) => (
                <div key={index} className={styles.colorSwatch}>
                  <div 
                    className={styles.colorBlock} 
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className={styles.colorInfo}>
                    <span className={styles.colorName}>{color.name}</span>
                    <span className={styles.colorHex}>{color.hex}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Font Pair Swatch */}
            <div className={`ds-card ${styles.typoDemoCard}`}>
              <h4 className="ds-heading" style={{ marginBottom: 16, fontSize: "var(--font-size-body-large)" }}>Active Typography Pairing</h4>
              <div className={styles.typoGrid}>
                {THEMES[activeTheme].typography.slice(0, 4).map((typo, idx) => (
                  <div key={idx} className={styles.typoRow}>
                    <span className={styles.typoLabel}>{typo.level}</span>
                    <div>
                      <div style={{ 
                        fontFamily: "var(--font-family-heading)", 
                        fontSize: typo.level.includes("H") ? `calc(${typo.size.split("/")[1]?.trim() || "1.2rem"} * 0.7)` : typo.size.split("/")[1]?.trim(),
                        fontWeight: typo.weight
                      }}>
                        {typo.font}
                      </div>
                      <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>
                        Size: {typo.size} • Weight: {typo.weight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Tokens Code Panel */}
          <div className={styles.inspectorContainer}>
            <div className={`ds-card ${styles.inspectorCard}`}>
              <div className={styles.inspectorHeader}>
                <div className={styles.inspectorTitle}>
                  <Terminal size={14} style={{ marginRight: 6, display: "inline-block", verticalAlign: "middle" }} />
                  {THEMES[activeTheme].name} Design Tokens
                </div>
                
                <div className={styles.inspectorFormatBar}>
                  <button 
                    className={`${styles.formatButton} ${inspectorFormat === "css" ? styles.formatButtonActive : ""}`}
                    onClick={() => setInspectorFormat("css")}
                  >
                    CSS Variables
                  </button>
                  <button 
                    className={`${styles.formatButton} ${inspectorFormat === "json" ? styles.formatButtonActive : ""}`}
                    onClick={() => setInspectorFormat("json")}
                  >
                    JSON Tokens
                  </button>
                </div>
              </div>

              <div className={styles.codePanel}>
                <button className={styles.copyButton} onClick={handleCopy}>
                  {copied ? (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Check size={12} /> Copied!
                    </span>
                  ) : (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Copy size={12} /> Copy
                    </span>
                  )}
                </button>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  <code>{getTokensText()}</code>
                </pre>
              </div>

              <div style={{ marginTop: 24, fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>
                <strong>Figma Variables Compatible:</strong> Copy the JSON format directly into Figma tokens or Tailwind extensions. Toggle themes below in the dock to watch the full-scale Karzalay product landing page update instantly!
              </div>
            </div>
          </div>

        </section>


        {/* ==========================================================================
           FULL PRODUCT LANDING PAGE SECTIONS (Live-morphing dynamically below)
           ========================================================================== */}
        <div id="hero" style={{ borderTop: "1px dashed var(--color-border)", paddingTop: 32 }}>
          
          {/* 1. HERO SECTION */}
          <section className={`container ${styles.hero}`}>
            
            <div className={styles.heroContent}>
              <div className={styles.badge}>
                <Cpu size={12} style={{ marginRight: 6, display: "inline-block", verticalAlign: "middle" }} />
                Synchronized Economic Simulation
              </div>
              
              <h1 className={`ds-heading ${styles.title}`}>
                The Operating System<br />
                <span className={styles.titleHighlight}>for Simulated Companies</span>
              </h1>
              
              <p className={`ds-body ${styles.description}`}>
                Launch, collaborate, and sync autonomous AI companies inside a secure digital 
                city. Empower AI agent employees to manage cap tables, trade assets, and execute 
                live economic ledger operations.
              </p>
              
              <div className={styles.heroActions}>
                <button className={`ds-btn-primary ${styles.btnMd}`}>Start Building Free</button>
                <button className={`ds-btn-secondary ${styles.btnMd}`}>Explore simulated city</button>
              </div>
            </div>

            {/* Simulated Workspace Console (Agent corridors) */}
            <div className={styles.visualWrapper}>
              <div className={styles.sandboxContainer}>
                <div className={styles.sandboxHeader}>
                  <div className={styles.sandboxControls}>
                    <div className={styles.windowDot} />
                    <div className={styles.windowDot} />
                    <div className={styles.windowDot} />
                  </div>
                  <div className={styles.sandboxTitle}>Live Agent Orchestration Console</div>
                </div>

                <div className={styles.simWorkspace}>
                  <div className={styles.simHeader}>
                    <span>Active Corridor: 0x991</span>
                    <span>AI Spawns: {agents.length}</span>
                  </div>

                  <div className={styles.simStage}>
                    {agents.length === 0 && (
                      <div className={styles.simStagePlaceholder}>
                        Simulation idle. Spawn agents to run companies!
                      </div>
                    )}
                    <AnimatePresence>
                      {agents.map((agent) => (
                        <motion.div
                          key={agent.id}
                          className={styles.simAgentNode}
                          initial={{ opacity: 0, scale: 0.5, y: 15 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            x: `${agent.x}%`, 
                            y: `${agent.y}%`,
                          }}
                          exit={{ opacity: 0, scale: 0.3 }}
                          transition={{ 
                            type: activeTheme === "high-fashion-swiss" ? "tween" : "spring",
                            stiffness: 260,
                            damping: 20
                          }}
                          style={{
                            left: 0,
                            top: 0,
                            transform: "translate(-50%, -50%)"
                          }}
                        >
                          <div className={styles.agentIndicator} />
                          <span style={{ fontWeight: 600 }}>{agent.name.split(" ")[0]}</span>
                          <span style={{ fontSize: "0.65rem", opacity: 0.7 }}>{agent.stat.split("·")[0]}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className={styles.simActionBox}>
                  <button 
                    className={`ds-btn-secondary ${styles.btnSm} ${styles.spawnButton}`}
                    onClick={handleSpawnAgent}
                  >
                    <Plus size={14} />
                    Spawn simulated company
                  </button>
                  <button 
                    className={`ds-btn-secondary ${styles.btnSm}`}
                    onClick={() => setAgents([])}
                    style={{ opacity: 0.6 }}
                  >
                    <RefreshCw size={12} />
                  </button>
                </div>

              </div>
            </div>

          </section>

          {/* 2. THE CITY OF SIMULATED COMPANIES (Ecosystem Grid) */}
          <section id="ecosystem" className={`container ${styles.ecosystemSection}`}>
            
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>01 / THE ECOSYSTEM GRID</span>
              <h2 className={`ds-heading ${styles.sectionTitle}`}>Discover Active Simulated Holdings</h2>
              <p className={`ds-body ${styles.sectionDesc}`}>
                Explore high-performance autonomous organizations executing transactions 24/7.
              </p>
            </div>

            <div className={styles.grid}>
              
              <div className={`ds-card ${styles.ecoCard}`}>
                <div className={styles.ecoCardHeader}>
                  <div className={styles.ecoAvatar}>N</div>
                  <div>
                    <h3 className={styles.ecoTitle}>Nexus Protocol</h3>
                    <span className={styles.ecoCategory}>DeFi simulated sandbox</span>
                  </div>
                </div>
                <p className="ds-body" style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)", minHeight: 60 }}>
                  Executing synthetic yield allocations and transaction routing algorithms.
                </p>
                <div className={styles.ecoBody}>
                  <span className={styles.ecoMetricLabel}>Holding Stat</span>
                  <span className={styles.ecoMetricVal}>$12M TVL</span>
                </div>
              </div>

              <div className={`ds-card ${styles.ecoCard}`}>
                <div className={styles.ecoCardHeader}>
                  <div className={styles.ecoAvatar} style={{ color: "var(--color-secondary)", background: "var(--color-background)", border: "1px solid var(--color-border)" }}>A</div>
                  <div>
                    <h3 className={styles.ecoTitle}>Aura Network</h3>
                    <span className={styles.ecoCategory}>L1 infrastructure</span>
                  </div>
                </div>
                <p className="ds-body" style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)", minHeight: 60 }}>
                  Simulating multi-node transaction latency and high-capacity TPS ledgers.
                </p>
                <div className={styles.ecoBody}>
                  <span className={styles.ecoMetricLabel}>Holding Stat</span>
                  <span className={styles.ecoMetricVal}>100k TPS</span>
                </div>
              </div>

              <div className={`ds-card ${styles.ecoCard}`}>
                <div className={styles.ecoCardHeader}>
                  <div className={styles.ecoAvatar}>O</div>
                  <div>
                    <h3 className={styles.ecoTitle}>Oasis VR</h3>
                    <span className={styles.ecoCategory}>Metaverse hub</span>
                  </div>
                </div>
                <p className="ds-body" style={{ fontSize: "var(--font-size-caption)", color: "var(--color-text-secondary)", minHeight: 60 }}>
                  Orchestrating autonomous simulated virtual reality users and trade.
                </p>
                <div className={styles.ecoBody}>
                  <span className={styles.ecoMetricLabel}>Holding Stat</span>
                  <span className={styles.ecoMetricVal}>50k Synced</span>
                </div>
              </div>

            </div>

          </section>

          {/* 3. THE ECONOMIC LEDGER (Live Transaction Feed) */}
          <section id="ledger" className={`container ${styles.ledgerSection}`}>
            
            <div>
              <span className={styles.sectionLabel}>02 / LIVE SYNCHRONIZATION</span>
              <h2 className={`ds-heading ${styles.sectionTitle}`} style={{ margin: "12px 0 var(--spacing-16) 0" }}>
                The Live Economic Ledger
              </h2>
              <p className={`ds-body ${styles.description}`}>
                Every single action in Karzalay is fed directly into a public synchronized ledger. 
                AI agents generate invoices, settle corporate assets, and buy stock stakes.
              </p>
              <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
                <div className="ds-body" style={{ fontSize: "var(--font-size-caption)" }}>
                  <Shield size={16} style={{ color: "var(--color-primary)", marginRight: 8, display: "inline-block", verticalAlign: "middle" }} />
                  Safe Auditing
                </div>
                <div className="ds-body" style={{ fontSize: "var(--font-size-caption)" }}>
                  <Activity size={16} style={{ color: "var(--color-primary)", marginRight: 8, display: "inline-block", verticalAlign: "middle" }} />
                  Zero Gas sync
                </div>
              </div>
            </div>

            {/* Real-time feed panel */}
            <div className={styles.ledgerPanel}>
              <div className={styles.ledgerHeader}>
                <span className={styles.ledgerTitle}>
                  <Activity size={14} className={styles.agentIndicator} style={{ background: "none", animation: "pulse 2s infinite" }} />
                  Economic Ledger Feed
                </span>
                <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>Updated in real-time</span>
              </div>

              <div className={styles.ledgerScrollContainer}>
                <AnimatePresence initial={false}>
                  {transactions.map((tx) => (
                    <motion.div
                      key={tx.id}
                      className={styles.ledgerItem}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={styles.ledgerItemMeta}>
                        <span className={styles.ledgerAgent}>{tx.agent}</span>
                        <span className={styles.ledgerVal}>{tx.amount}</span>
                      </div>
                      <div className={styles.ledgerDesc}>
                        {tx.action} <strong style={{ color: "var(--color-text-primary)" }}>Karzalay Sandbox</strong>
                      </div>
                      <span className={styles.ledgerTime}>{tx.time}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </section>

          {/* 4. WORKSPACE DASHBOARD PREVIEWS (Lead vs Member Dashboard tabs) */}
          <section id="dashboard" className={`container ${styles.dashboardSection}`}>
            
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>03 / TEAM INTERFACES</span>
              <h2 className={`ds-heading ${styles.sectionTitle}`}>Role-Specific Control Panels</h2>
              <p className={`ds-body ${styles.sectionDesc}`}>
                Karzalay adapts cleanly depending on whether you are a team Lead or an engineering Member.
              </p>
            </div>

            {/* Switchers */}
            <div className={styles.tabHeader}>
              <button 
                className={`${styles.tabButton} ${activeTab === "lead" ? styles.tabButtonActive : ""}`}
                onClick={() => setActiveTab("lead")}
              >
                Lead Control Dashboard
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === "member" ? styles.tabButtonActive : ""}`}
                onClick={() => setActiveTab("member")}
              >
                Member Tasks Dashboard
              </button>
            </div>

            {/* Dashboard Window Preview */}
            <div className={styles.dashboardWindow}>
              
              <div className={styles.windowMeta}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: "bold", opacity: 0.6, textTransform: "uppercase" }}>
                    CONSOLE PORTAL ➔ LIVE SYSTEM
                  </span>
                  <h3 className={styles.windowMetaTitle}>
                    {activeTab === "lead" ? "Lead Director view" : "Engineering Operator view"}
                  </h3>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <span className={styles.badge} style={{ fontSize: "0.65rem", padding: "4px 10px" }}>
                    {activeTab === "lead" ? "Core Admin" : "Operator Node"}
                  </span>
                </div>
              </div>

              {activeTab === "lead" ? (
                /* Lead View mockup */
                <div className={styles.dashboardGrid}>
                  
                  <div className={styles.kanbanPipeline}>
                    <div className={styles.kanbanColumn}>
                      <span className={styles.columnHeader}>Simulations Pipeline</span>
                      
                      <div className={styles.taskCard}>
                        <span className={styles.taskTitle}>Sync Nexus TVL bounds</span>
                        <div className={styles.taskOwner}>
                          <span className={styles.ownerBadge}>High Priority</span>
                          <span style={{ opacity: 0.7 }}>0x4B</span>
                        </div>
                      </div>

                      <div className={styles.taskCard}>
                        <span className={styles.taskTitle}>Scale L1 TPS throughput</span>
                        <div className={styles.taskOwner}>
                          <span className={styles.ownerBadge}>Normal</span>
                          <span style={{ opacity: 0.7 }}>0x8A</span>
                        </div>
                      </div>

                    </div>

                    <div className={styles.kanbanColumn}>
                      <span className={styles.columnHeader}>Active Standup Review</span>
                      
                      <div className={styles.taskCard}>
                        <span className={styles.taskTitle}>Sync Fastify microservice</span>
                        <div className={styles.taskOwner}>
                          <span className={styles.ownerBadge} style={{ background: "var(--color-accent-bg)", color: "var(--color-primary)" }}>Pending Review</span>
                          <span style={{ opacity: 0.7 }}>0x9A</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right hand stats */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div className="ds-card" style={{ padding: 20 }}>
                      <h4 className="ds-heading" style={{ fontSize: "var(--font-size-caption)", marginBottom: 8 }}>Ecosystem Capital</h4>
                      <span style={{ fontSize: "var(--font-size-h3)", fontWeight: "bold", color: "var(--color-primary)" }}>$12.45M</span>
                      <p style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: 4 }}>+12.4% simulation growth this week</p>
                    </div>

                    <div className="ds-card" style={{ padding: 20 }}>
                      <h4 className="ds-heading" style={{ fontSize: "var(--font-size-caption)", marginBottom: 8 }}>Decision Proposals</h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", borderBottom: "1px solid var(--color-border)", paddingBottom: 6 }}>
                          <span>Sync Neon database</span>
                          <span style={{ color: "var(--color-success)" }}>Approved</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                          <span>Aura Network fork</span>
                          <span style={{ opacity: 0.6 }}>Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                /* Member View mockup */
                <div className={styles.dashboardGrid} style={{ gridTemplateColumns: "1fr 1.2fr" }}>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div className="ds-card" style={{ padding: 20 }}>
                      <h4 className="ds-heading" style={{ fontSize: "var(--font-size-caption)", marginBottom: 8 }}>Your Active Targets</h4>
                      <ul style={{ fontSize: "var(--font-size-caption)", opacity: 0.8, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                        <li>Verify Fastify backend endpoint syncing</li>
                        <li>Deploy showcase tokens preview framework</li>
                        <li>Audit simulated ledgers transaction logs</li>
                      </ul>
                    </div>

                    <div className="ds-card" style={{ padding: 20 }}>
                      <h4 className="ds-heading" style={{ fontSize: "var(--font-size-caption)", marginBottom: 8 }}>Standups logs</h4>
                      <span style={{ fontSize: "var(--font-size-body)", fontWeight: "bold" }}>Operator Node: 0x9A</span>
                      <p style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: 4 }}>Logs active: Standup #44 syncing</p>
                    </div>
                  </div>

                  <div className={styles.kanbanColumn}>
                    <span className={styles.columnHeader}>Personal Kanban Target Pipeline</span>
                    
                    <div className={styles.taskCard}>
                      <span className={styles.taskTitle}>Rearchitect layout.tsx global variables</span>
                      <div className={styles.taskOwner}>
                        <span className={styles.ownerBadge}>Tasks Node</span>
                        <span style={{ opacity: 0.7 }}>0x42</span>
                      </div>
                    </div>

                    <div className={styles.taskCard}>
                      <span className={styles.taskTitle}>Inject Lucide icons scales</span>
                      <div className={styles.taskOwner}>
                        <span className={styles.ownerBadge} style={{ background: "rgba(0, 0, 0, 0.05)", color: "var(--color-text-primary)" }}>Pending</span>
                        <span style={{ opacity: 0.7 }}>0x42</span>
                      </div>
                    </div>

                  </div>

                </div>
              )}

            </div>

          </section>

          {/* 5. CALL TO ACTION SECTION */}
          <section className={`container ${styles.ctaSection}`}>
            <div className={styles.ctaCard}>
              <h2 className={`ds-heading ${styles.ctaTitle}`} style={{ fontSize: "var(--font-size-h2)" }}>
                Ready to Spawn Your Simulated Company?
              </h2>
              <p className={`ds-body ${styles.ctaDesc}`}>
                Join hundreds of founders synchronizing their corporate teams, AI operations, 
                and transactional logs inside the Karzalay digital sandbox.
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                <button className={`ds-btn-primary ${styles.btnLg}`}>Create simulated firm</button>
                <button className={`ds-btn-secondary ${styles.btnLg}`}>Talk with developers</button>
              </div>
            </div>
          </section>

          {/* 6. LANDING FOOTER */}
          <footer className={styles.footer}>
            <div className={`container ${styles.footerGrid}`}>
              
              <div className={styles.footerCol}>
                <div className={styles.footerLogo}>
                  <div className={styles.footerLogoMark} />
                  <span>Karzalay</span>
                </div>
                <p className={styles.footerDesc}>
                  The Operating System for Simulated Companies. Sync AI work, ledgers, and team 
                  sprints in a zero-gas, high-speed sandbox.
                </p>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Ecosystem</h4>
                <div className={styles.footerLinksList}>
                  <a href="#hero" className={styles.footerLinkItem}>Platform</a>
                  <a href="#ecosystem" className={styles.footerLinkItem}>Active Holdings</a>
                  <a href="#ledger" className={styles.footerLinkItem}>Simulation Ledger</a>
                </div>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Features</h4>
                <div className={styles.footerLinksList}>
                  <a href="#dashboard" className={styles.footerLinkItem}>Lead Dashboard</a>
                  <a href="#dashboard" className={styles.footerLinkItem}>Member Standups</a>
                  <a href="#hero" className={styles.footerLinkItem}>AI Spawning</a>
                </div>
              </div>

              <div className={styles.footerCol}>
                <h4 className={styles.footerColTitle}>Resources</h4>
                <div className={styles.footerLinksList}>
                  <a href="#" className={styles.footerLinkItem}>Figma Templates</a>
                  <a href="#" className={styles.footerLinkItem}>Design Tokens v2</a>
                  <a href="#" className={styles.footerLinkItem}>Framer Hub</a>
                </div>
              </div>

            </div>

            <div className={`container ${styles.footerBottom}`}>
              <span>© 2026 Karzalay Platform. Designed by Frontend & Design team.</span>
              <div style={{ display: "flex", gap: 24 }}>
                <a href="#" className={styles.footerLinkItem}>Privacy Policy</a>
                <a href="#" className={styles.footerLinkItem}>Terms of Service</a>
              </div>
            </div>

          </footer>

        </div>

        {/* ==========================================================================
           FLOATING DOCK SWITCHER: 10 PREMIUM WHITETHEME SELECTIONS
           ========================================================================== */}
        <div className={styles.floatingSwitcher}>
          <span className={styles.switcherLabel}>Tokens Switcher v2</span>
          {Object.values(THEMES).map((theme) => (
            <button
              key={theme.key}
              className={`${styles.themeButton} ${activeTheme === theme.key ? styles.themeButtonActive : ""}`}
              onClick={() => setActiveTheme(theme.key)}
            >
              {theme.name}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
