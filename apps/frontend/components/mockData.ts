/* ═══════════════════════════════════════════
 * File: components/mockData.ts
 * Purpose: Provides realistic fixture data for components (e.g. CredentialCard) during development and preview.
 * Design Decisions:
 * - Mocks cryptographic signatures and activity arrays so the UI can be built independently of backend readiness.
 * - Dynamic generation based on the passed ID to simulate varied data.
 * Tokens Used: N/A (Data layer only)
 * Component Connections:
 * - Read by Profile and Verify pages.
 * ═══════════════════════════════════════════ */
export interface CredentialData {
  id: string;
  name: string;
  role: string;
  company: string;
  attendanceScore: number;
  commitCount: number;
  duration: string;
  isVerified: boolean;
  signature: string;
  issuedAt: string;
  verifiedImpact: string;
  contributions: Array<{ date: string; count: number }>;
}

export function getMockCredential(userId: string): CredentialData | null {
  if (userId === 'not-found') {
    return null;
  }

  // Generate a mock 12-week contribution graph (84 days)
  const contributions = Array.from({ length: 84 }).map((_, i) => {
    let intensity = 0;
    const rand = Math.random();
    if (rand > 0.8) intensity = 3;
    else if (rand > 0.5) intensity = 2;
    else if (rand > 0.2) intensity = 1;
    
    return {
      date: new Date(Date.now() - (83 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      count: intensity
    };
  });

  // Dynamic resolution of Name, Role, Company based on ID
  let name = "Sarah Chen";
  let role = "Backend Lead";
  let company = "Nexus UI";

  if (userId) {
    const cleanId = userId.startsWith('kz-') ? userId.slice(3) : userId;
    name = cleanId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
    if (cleanId.includes('design') || cleanId.includes('johnson')) role = 'Product Designer';
    else if (cleanId.includes('architect') || cleanId.includes('rivera')) role = 'Frontend Architect';
    else if (cleanId.includes('frontend') || cleanId.includes('doe') || cleanId.includes('deshmukh')) role = 'Frontend Developer';
    else if (cleanId.includes('backend') || cleanId.includes('chen') || cleanId.includes('nair')) role = 'Backend Developer';
    else if (cleanId.includes('mobile') || cleanId.includes('kapoor')) role = 'Mobile Developer';
    else if (cleanId.includes('founder') || cleanId.includes('bora')) role = 'Founder & Lead Developer';
    else if (cleanId.includes('database') || cleanId.includes('gupta') || cleanId.includes('db')) role = 'Database Administrator';
    else role = 'Developer';

    if (cleanId.includes('bora') || cleanId.includes('deshmukh') || cleanId.includes('nair') || cleanId.includes('kapoor')) {
      company = 'Raasta Maps';
    } else if (cleanId.includes('rivera') || cleanId.includes('forge')) {
      company = 'CodeForge';
    } else if (cleanId.includes('gupta') || cleanId.includes('perfect')) {
      company = 'PixelPerfect';
    }
  }

  return {
    id: userId,
    name,
    role,
    company,
    attendanceScore: userId === 'kz-mike-johnson' ? 85 : 98,
    commitCount: userId === 'kz-mike-johnson' ? 420 : 1420,
    duration: '8 Months',
    isVerified: true,
    signature: `0x7a3f9e2b1c4d6a8b9f0e1d2c3b4a5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a-${userId}`,
    issuedAt: '2026-06-02T10:00:00Z',
    verifiedImpact: 'Architected and deployed a highly scalable edge-caching layer that reduced TTFB (Time to First Byte) by 40% and increased checkout conversion revenue by 15% across all regions.',
    contributions
  };
}
