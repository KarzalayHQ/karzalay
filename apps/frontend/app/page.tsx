/* ═══════════════════════════════════════════
 * File: app/page.tsx
 * Purpose: Serves as the landing page (Home) for Karzalay.
 * Design Decisions: 
 * - Hardcoded styles and inline CSS for rapid prototyping and standalone portability.
 * - Uses a high-contrast visual hierarchy to emphasize calls to action (CTAs).
 * - Implements fluid typography and dynamic CSS variables.
 * Tokens Used: 
 * - Purples (#6C3CE0, #7C4DFF, #F3F0FE) for primary branding.
 * - Gradients and blurred orbs (radial-gradient) for depth and modern aesthetics.
 * Component Connections:
 * - Uses Navbar for top navigation.
 * - Uses CredentialCard for the Verifiable Credentials preview section.
 * ═══════════════════════════════════════════ */
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import { CredentialCard } from '@/components/ui/CredentialCard';

export const metadata: Metadata = {
  title: "Karzalay – India's Startup Sprint Network",
  description: 'Browse and join high-velocity startup cohorts across Indian cities. Filter by city, find your team, and build fast with Karzalay.',
};

export default function HomePage() {
  return (
    <div style={{ fontFamily: 'var(--font-sans)', background: '#fff', color: '#1C1233', WebkitFontSmoothing: 'antialiased', overflowX: 'clip' }}>
      <Navbar />

      {/* ─── Hero Section ─── */}
      {/* Design Decision: Uses absolute positioned blurred orbs for a dynamic background effect. */}
      <section style={{ position: 'relative', padding: '90px 40px 80px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ 
          position: 'absolute', top: '-40px', left: '-120px', width: '520px', height: '520px', 
          borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, rgba(124,77,255,0.22), rgba(255,139,194,0.10) 45%, transparent 70%)', 
          filter: 'blur(20px)', animation: 'kzOrb 16s ease-in-out infinite', pointerEvents: 'none' 
        }} />
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '56px', alignItems: 'center', position: 'relative' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '7px 15px', borderRadius: '999px', background: 'rgba(108,60,224,0.09)', color: '#6C3CE0', fontSize: '13.5px', fontWeight: 600, marginBottom: '26px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#6C3CE0', boxShadow: '0 0 0 4px rgba(108,60,224,0.18)' }} />
              🚀 Now live across 12 cities
            </div>
            
            <h1 style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 8vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.035em', marginBottom: '24px' }}>
              Sprint faster.<br />
              <span style={{ background: 'linear-gradient(120deg,#7C4DFF,#A06BFF 60%,#FF8BC2)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Build together.
              </span>
            </h1>
            
            <p style={{ fontSize: '19px', lineHeight: 1.55, color: '#5A5270', maxWidth: '486px', marginBottom: '34px' }}>
              Karzalay connects ambitious founders and operators into focused weekly sprints.
              <strong style={{ color: '#1C1233', fontWeight: 700 }}> Find your city, join a company, and ship what matters.</strong>
            </p>
            
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/register" className="kz-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', textDecoration: 'none', background: 'linear-gradient(135deg,#7C4DFF,#6C3CE0)', color: '#fff', padding: '16px 28px', borderRadius: '14px', fontWeight: 700, fontSize: '16px', boxShadow: '0 12px 30px rgba(108,60,224,0.34)' }}>
                Join a Sprint <span style={{ fontSize: '18px' }}>→</span>
              </Link>
              <Link href="/cities" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', textDecoration: 'none', background: '#fff', color: '#1C1233', padding: '16px 28px', borderRadius: '14px', fontWeight: 700, fontSize: '16px', border: '1.5px solid rgba(28,18,51,0.14)' }}>
                Browse Companies
              </Link>
            </div>
            
            <div style={{ display: 'flex', gap: '30px', marginTop: '42px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '27px', letterSpacing: '-0.02em' }}>200+</div>
                <div style={{ fontSize: '13px', color: '#8A82A0', marginTop: '2px' }}>Active Founders</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(28,18,51,0.1)' }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '27px', letterSpacing: '-0.02em' }}>12</div>
                <div style={{ fontSize: '13px', color: '#8A82A0', marginTop: '2px' }}>Cities</div>
              </div>
              <div style={{ width: '1px', background: 'rgba(28,18,51,0.1)' }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: '27px', letterSpacing: '-0.02em' }}>94%</div>
                <div style={{ fontSize: '13px', color: '#8A82A0', marginTop: '2px' }}>Completion Rate</div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual */}
          <div className="kz-desktop-only" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', inset: '-30px', background: 'radial-gradient(circle at 70% 20%, rgba(124,77,255,0.18), transparent 60%)', filter: 'blur(10px)', borderRadius: '40px' }} />
            <div style={{ position: 'relative', background: '#fff', border: '1px solid rgba(28,18,51,0.07)', borderRadius: '24px', padding: '22px', boxShadow: '0 30px 70px rgba(43,19,91,0.16)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontWeight: 700, fontSize: '15px' }}>City Directory · Bengaluru</span>
                <span style={{ fontSize: '12px', color: '#8A82A0', background: '#F3F0FE', padding: '4px 10px', borderRadius: '999px' }}>14 open sprints</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { initial: 'N', name: 'Nexus UI', tag: 'Developer Tools · W7', color: '#6C3CE0' },
                  { initial: 'A', name: 'Acme Corp', tag: 'Fintech · W4', color: '#18935A' },
                  { initial: 'P', name: 'Pellet Ops', tag: 'Logistics · W2', color: '#E8763A' },
                ].map((co) => (
                  <div key={co.name} style={{ display: 'flex', alignItems: 'center', gap: '13px', background: '#FAF9FE', border: '1px solid rgba(28,18,51,0.05)', borderRadius: '15px', padding: '13px 15px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: co.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '18px', flexShrink: 0 }}>
                      {co.initial}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '15px' }}>{co.name}</div>
                      <div style={{ color: '#8A82A0', fontSize: '12.5px' }}>{co.tag}</div>
                    </div>
                    <span style={{ fontSize: '12px', color: '#6C3CE0', fontWeight: 700, whiteSpace: 'nowrap', background: 'rgba(108,60,224,0.08)', padding: '5px 10px', borderRadius: '999px' }}>
                      Join Cohort
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: 'absolute', top: '-18px', right: '-14px', background: '#18935A', color: '#fff', padding: '10px 16px', borderRadius: '13px', fontSize: '13px', fontWeight: 700, boxShadow: '0 12px 26px rgba(24,147,90,0.36)', animation: 'kzFloat 4.5s ease-in-out infinite' }}>
              Sprint W7 active ✓
            </div>
          </div>
        </div>
      </section>

      {/* ─── Marquee Section ─── */}
      {/* Creates a continuous sliding text effect to highlight key value props. */}
      <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(28,18,51,0.07)', borderBottom: '1px solid rgba(28,18,51,0.07)', background: '#F6F4FF', padding: '15px 0' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'kzMarquee 26s linear infinite', gap: '48px' }}>
          {[1, 2].map((group) => (
            <div key={group} style={{ display: 'flex', gap: '48px' }}>
              {['Focused Sprints', 'Verifiable Proof', 'Weekly Check-ins', 'High Velocity', 'Startup Cohorts', 'Peer Accountability'].map((m) => (
                <span key={m} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontWeight: 700, fontSize: '17px', color: '#6B6184', whiteSpace: 'nowrap' }}>
                  {m} <span style={{ color: '#6C3CE0', fontSize: '14px' }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── 3 Steps Section ─── */}
      {/* Explains the user journey in a clear, card-based layout. */}
      <section style={{ padding: '100px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ maxWidth: '730px' }}>
          <div style={{ fontSize: '13.5px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6C3CE0', marginBottom: '18px' }}>How it works</div>
          <h2 style={{ fontWeight: 800, fontSize: '44px', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: '22px' }}>
            Ship more in three steps.
          </h2>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#5A5270' }}>
            Join a highly focused sprint cohort, set your weekly goals, and build with momentum alongside other driven founders and operators.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px', marginTop: '46px' }}>
          {[
            { n: '01', title: 'Find your city', desc: 'Browse our directory of active startup companies across Indian cities. Filter by location and size to find the right fit.' },
            { n: '02', title: 'Join a sprint', desc: 'Register in under 2 minutes. Each cohort runs tight weekly sprints with shared goals, check-ins, and accountability.' },
            { n: '03', title: 'Build & ship', desc: 'Use the structured sprint framework to turn ideas into shipped products. Weekly reviews keep momentum high.' },
          ].map((step) => (
            <div key={step.n} className="kz-lift" style={{ background: '#fff', border: '1px solid rgba(28,18,51,0.08)', borderRadius: '20px', padding: '28px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#6C3CE0', marginBottom: '12px' }}>Step {step.n}</div>
              <div style={{ fontWeight: 800, fontSize: '26px', letterSpacing: '-0.02em', color: '#1C1233' }}>{step.title}</div>
              <p style={{ marginTop: '8px', color: '#5A5270', fontSize: '15px', lineHeight: 1.5 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Verifiable Credentials Section ─── */}
      {/* Displays a demo of the core platform feature (Proof of Work) using the reusable CredentialCard component. */}
      <section style={{ position: 'relative', background: '#F8F6FF', color: '#1C1233', padding: '104px 40px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-80px', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,77,255,0.08), transparent 65%)', filter: 'blur(30px)', animation: 'kzOrb 18s ease-in-out infinite' }} />
        
        <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '64px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6C3CE0', marginBottom: '18px' }}>Proof of Work</div>
            <h2 style={{ fontWeight: 800, fontSize: '44px', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: '22px' }}>
              Verifiable Credentials
            </h2>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#5A5270', marginBottom: '32px' }}>
              When you build with Karzalay, your work is cryptographically verified. 
              Recruiters and future teams can view your actual attendance, commits, and role progression in real-time.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'Top Builder: Sarah Chen', subtitle: 'Backend Lead at Nexus UI', score: '98% Attendance' },
                { title: 'Top Builder: Alex Rivera', subtitle: 'Frontend Architect at Acme Corp', score: '97% Attendance' }
              ].map((builder) => (
                <div key={builder.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#fff', borderRadius: '16px', border: '1px solid rgba(28,18,51,0.05)', boxShadow: '0 4px 14px rgba(43,19,91,0.04)' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1C1233' }}>{builder.title}</div>
                    <div style={{ fontSize: '13px', color: '#8A82A0' }}>{builder.subtitle}</div>
                  </div>
                  <div style={{ color: '#22c55e', fontWeight: 700, fontSize: '14px' }}>
                    {builder.score}
                  </div>
                </div>
              ))}
            </div>
            
            <Link href="/talent" style={{ display: 'inline-block', marginTop: '24px', color: '#6C3CE0', fontWeight: 600, textDecoration: 'none' }}>
              View full Talent Board →
            </Link>
          </div>
          
          <div className="kz-lift">
            <CredentialCard credential={{
              name: 'Sarah Chen',
              role: 'Backend Lead',
              company: 'Nexus UI',
              attendanceScore: 98,
              commitCount: 1420,
              duration: '8 Months',
              isVerified: true,
              signature: '0x7a3f9e2b1c4d6a8b9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a',
              issuedAt: '2026-06-02T10:00:00Z',
              verifiedImpact: 'Architected and deployed a highly scalable edge-caching layer that reduced TTFB by 40% and increased checkout conversion revenue by 15%.',
              contributions: Array.from({ length: 84 }).map((_, i) => ({
                date: new Date(Date.now() - (83 - i) * 86400000).toISOString().split('T')[0],
                count: Math.random() > 0.7 ? 3 : Math.random() > 0.4 ? 1 : 0
              }))
            }} />
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      {/* Strong closing call-to-action utilizing gradients to draw the eye. */}
      <section style={{ padding: '104px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', background: 'linear-gradient(135deg,#2B1364,#6C3CE0)', borderRadius: '32px', padding: '68px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,139,194,0.5), transparent 68%)', filter: 'blur(20px)', animation: 'kzOrb 17s ease-in-out infinite' }} />
          <div style={{ position: 'absolute', bottom: '-90px', left: '-50px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,77,255,0.55), transparent 70%)', filter: 'blur(24px)', animation: 'kzOrb 21s ease-in-out infinite' }} />
          
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.025em', color: '#fff', position: 'relative' }}>
            Ready to join a sprint?
          </h2>
          <p style={{ color: '#D7CDF5', fontSize: '18px', lineHeight: 1.55, maxWidth: '520px', margin: '18px auto 34px', position: 'relative' }}>
            Browse the city directory, join a company cohort, and ship something real this week.
          </p>
          
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <Link href="/register" className="kz-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', textDecoration: 'none', background: '#fff', color: '#3A1E7A', padding: '17px 32px', borderRadius: '14px', fontWeight: 800, fontSize: '17px', boxShadow: '0 14px 36px rgba(0,0,0,0.22)' }}>
              Join a Sprint <span>→</span>
            </Link>
            <Link href="/cities" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', textDecoration: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', padding: '17px 32px', borderRadius: '14px', fontWeight: 700, fontSize: '17px', border: '1px solid rgba(255,255,255,0.28)' }}>
              Browse Companies
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Extended Footer ─── */}
      {/* Contains platform links, legal, and social items. */}
      <footer style={{ borderTop: '1px solid rgba(28,18,51,0.08)', padding: '64px 40px', background: '#F8F6FF' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', paddingBottom: '48px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '11px', marginBottom: '16px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg,#7C4DFF,#6C3CE0)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '15px' }}>K</div>
              <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.02em', color: '#1C1233' }}>Karzalay</span>
            </div>
            <p style={{ color: '#5A5270', fontSize: '14px', lineHeight: 1.6 }}>
              India's Startup Sprint Network. <br/>
              Build fast, prove your work.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '15px', color: '#1C1233', marginBottom: '16px' }}>Platform</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li><Link href="/cities" style={{ color: '#5A5270', textDecoration: 'none' }}>City Directory</Link></li>
              <li><Link href="/talent" style={{ color: '#5A5270', textDecoration: 'none' }}>Talent Board</Link></li>
              <li><Link href="/login" style={{ color: '#5A5270', textDecoration: 'none' }}>Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '15px', color: '#1C1233', marginBottom: '16px' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li><Link href="#" style={{ color: '#5A5270', textDecoration: 'none' }}>About Us</Link></li>
              <li><Link href="#" style={{ color: '#5A5270', textDecoration: 'none' }}>Contact</Link></li>
              <li><Link href="#" style={{ color: '#5A5270', textDecoration: 'none' }}>Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, fontSize: '15px', color: '#1C1233', marginBottom: '16px' }}>Legal</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li><Link href="#" style={{ color: '#5A5270', textDecoration: 'none' }}>Privacy Policy</Link></li>
              <li><Link href="#" style={{ color: '#5A5270', textDecoration: 'none' }}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div style={{ maxWidth: '1240px', margin: '0 auto', paddingTop: '24px', borderTop: '1px solid rgba(28,18,51,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <span style={{ color: '#8A82A0', fontSize: '13px' }}>© {new Date().getFullYear()} Karzalay. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: '#8A82A0', fontSize: '13px', cursor: 'pointer' }}>Twitter</span>
            <span style={{ color: '#8A82A0', fontSize: '13px', cursor: 'pointer' }}>LinkedIn</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
