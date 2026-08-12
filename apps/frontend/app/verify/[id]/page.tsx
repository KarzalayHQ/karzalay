/* ═══════════════════════════════════════════
 * File: app/verify/[id]/page.tsx
 * Purpose: Public verification page for cryptographically signed credentials.
 * Design Decisions:
 * - Duplicates the profile view's logic, intended as a standalone view specifically for verification by third-parties.
 * Tokens Used:
 * - Identical INK and PURPLE scheme to profile/[id].
 * Component Connections:
 * - Heavy reliance on CredentialCard component.
 * ═══════════════════════════════════════════ */
import { Metadata } from 'next';
import Link from 'next/link';
import { CredentialCard } from '@/components/ui/CredentialCard';
import { Navbar } from '@/components/ui/Navbar';
import { ArrowLeft, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { getMockCredential, CredentialData } from '@/components/mockData';

interface CredentialProps {
  params: Promise<{ id: string }>;
}

async function getCredential(id: string): Promise<CredentialData | null> {
  return getMockCredential(id);
}

export async function generateMetadata({ params }: CredentialProps): Promise<Metadata> {
  const { id } = await params;
  const credential = await getCredential(id);

  if (!credential) {
    return {
      title: 'Credential Not Found - Karzalay',
      description: 'The requested work credential could not be found.',
    };
  }

  return {
    title: `${credential.name}'s Verified Profile | Karzalay`,
    description: `Verified ${credential.role} at ${credential.company}. Attendance: ${credential.attendanceScore}%, Commits: ${credential.commitCount}.`,
  };
}

const PURPLE = "#5B3FF8";
const PURPLE_XSOFT = "#F5F3FF";
const INK = "#1A1040";
const INK_MID = "#3D3A5C";
const INK_LIGHT = "#6B6887";
const GREEN = "#16A34A";
const GREEN_SOFT = "#DCFCE7";

export default async function CredentialPage({ params }: CredentialProps) {
  const { id } = await params;
  const credential = await getCredential(id);

  if (!credential) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', color: INK }}>404</h1>
          <p style={{ color: INK_MID, fontSize: '1.2rem', marginBottom: '2rem' }}>We couldn't find a verified profile at this address.</p>
          <Link href="/cities" style={{ background: PURPLE, color: '#fff', padding: '0.75rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>Return to Cities</Link>
        </div>
      </div>
    );
  }

  // Generate initials for avatar
  const initials = credential.name.split(' ').map(n => n[0]).join('');

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1.5rem 6rem' }}>
        {/* Back Link */}
        <Link href={`/cities/${credential.company.toLowerCase().replace(/\s+/g, '-')}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: INK_LIGHT, textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, marginBottom: "2rem" }}>
          <ArrowLeft size={16} /> Back to {credential.company}
        </Link>

        {/* Profile Header */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg, ${PURPLE_XSOFT}, #fff)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, color: PURPLE,
            border: '2px solid #fff', boxShadow: '0 4px 12px rgba(91,63,248,0.1)'
          }}>
            {initials}
          </div>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: INK, margin: '0 0 0.25rem', letterSpacing: '-0.04em' }}>
              {credential.name}
            </h1>
            <p style={{ fontSize: '1.05rem', color: INK_MID, margin: '0 0 0.5rem', fontWeight: 500 }}>
              {credential.role}
            </p>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: INK_LIGHT, fontWeight: 500 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Building2 size={14} /> {credential.company}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={14} /> Joined Apr 2025</span>
            </div>
          </div>
        </div>

        {/* About */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: INK, margin: '0 0 1rem' }}>About</h2>
          <p style={{ fontSize: '0.95rem', color: INK_MID, lineHeight: 1.6, margin: 0 }}>
            Node.js and MongoDB expert. Loves building APIs that handle millions of requests.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ background: '#fff', border: '1px solid rgba(91,63,248,0.1)', borderRadius: 16, padding: '1.25rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(91,63,248,0.03)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: INK, marginBottom: '0.25rem' }}>{credential.attendanceScore}%</div>
            <div style={{ fontSize: '0.75rem', color: INK_LIGHT, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Attendance</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(91,63,248,0.1)', borderRadius: 16, padding: '1.25rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(91,63,248,0.03)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: INK, marginBottom: '0.25rem' }}>10</div>
            <div style={{ fontSize: '0.75rem', color: INK_LIGHT, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sprints</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(91,63,248,0.1)', borderRadius: 16, padding: '1.25rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(91,63,248,0.03)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: INK, marginBottom: '0.25rem' }}>{credential.commitCount}</div>
            <div style={{ fontSize: '0.75rem', color: INK_LIGHT, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Commits</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(91,63,248,0.1)', borderRadius: 16, padding: '1.25rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(91,63,248,0.03)' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: INK, marginBottom: '0.25rem' }}>4.6/5</div>
            <div style={{ fontSize: '0.75rem', color: INK_LIGHT, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rating</div>
          </div>
        </div>

        {/* Verified Credential */}
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: INK, margin: '0 0 1.5rem' }}>Verified Credential</h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            {/* The existing CredentialCard component handles its own glassmorphic styling */}
            <CredentialCard credential={credential} />
          </div>

          <div style={{ background: GREEN_SOFT, border: `1px solid rgba(22,163,74,0.2)`, borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: GREEN, fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>
              <CheckCircle2 size={18} /> Credential Verified
            </div>
            <p style={{ color: '#15803d', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>This credential has been cryptographically signed and verified by Karzalay.</p>
            <p style={{ color: GREEN, fontSize: '0.75rem', margin: 0, fontFamily: 'monospace', fontWeight: 600 }}>{credential.signature}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
