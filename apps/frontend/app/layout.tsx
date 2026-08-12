/* ═══════════════════════════════════════════ 
 * File: app/layout.tsx
 * Purpose: Root layout component for the Karzalay app.
 * Connects the global styles, design tokens, and authentication context.
 * Design Decisions:
 * - Uses Next.js App Router root layout to wrap all pages.
 * - Imports multiple Google Fonts to match the landing page typography (Inter, Plus Jakarta Sans, Space Grotesk, Outfit).
 * - Wraps the entire application in the AuthProvider so auth state is available globally.
 * Tokens Used: Global CSS and custom token variables are imported here to ensure they apply everywhere.
 * ═══════════════════════════════════════════ */
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import "../styles/tokens.css";
// AuthProvider provides authentication state across all child components
import { AuthProvider } from "../context/AuthContext";

/* ─── Font Configuration ─── */
// Design Decision: Using Inter as the primary sans-serif font for high legibility in UI.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Ensures text remains visible during webfont load
});

// Plus Jakarta Sans for headings or stylized numbers (used in design system)
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

// Space Grotesk for technical/monospace-like labels (e.g. stats, scores)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Outfit for modern, geometric display text (hero sections)
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

/* ─── Metadata ─── */
// Defines default SEO metadata for the application.
// Template uses '%s' to allow child pages to set their own title prefixes.
export const metadata: Metadata = {
  title: {
    default: "Karzalay – India's Startup Sprint Network",
    template: "%s – Karzalay",
  },
  description: "Browse and join high-velocity startup cohorts across Indian cities. Filter by city, find your team, and build fast.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ─── Root Layout Component ─── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // HTML tag includes data-scroll-behavior for smooth anchor scrolling
    <html lang="en" data-scroll-behavior="smooth">
      <body
        // Injects all font CSS variables into the body
        className={`${inter.variable} ${plusJakarta.variable} ${spaceGrotesk.variable} ${outfit.variable}`}
        // Fallback styling: globally enforcing inter
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {/* AuthProvider wraps all children so pages can access useAuth() */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
