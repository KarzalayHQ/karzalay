import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}

export async function PATCH(request: NextRequest) {
  return handleRequest(request);
}

async function handleRequest(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let currentGate = parseInt(request.cookies.get('mockGate')?.value || '1', 10);

  let payload: any = {};
  try {
    if (request.method !== 'GET') {
      payload = await request.json();
    }
  } catch (e) {}

  const jsonResponse = (data: any, init?: ResponseInit) => {
    const res = NextResponse.json(data, init);
    // If gate changed, update cookie
    if (init?.headers && init.headers instanceof Headers) {
      // pass
    } else if (init?.headers) {
      // merge
    }
    return res;
  };

  const createResWithGate = (data: any, newGate: number) => {
    const res = NextResponse.json(data);
    res.cookies.set('mockGate', newGate.toString(), { path: '/' });
    return res;
  };

  if (pathname === '/api/auth/login' && request.method === 'POST') {
    // ══════════════════════════════════════════════════════════════════════════
    // BACKEND DEVELOPER INTEGRATION:
    // Here is the mock data. By this, these are the things that are redirecting to the next steps.
    // Replace this mock response with your actual backend database API call to authenticate the user and return user data.
    // ══════════════════════════════════════════════════════════════════════════
    const res = NextResponse.json({ id: '1', name: 'Mock User', email: payload.email, role: 'MEMBER' });
    res.cookies.set('sessionId', 'mock_session', { path: '/', httpOnly: true });
    if (!request.cookies.has('mockGate')) {
      res.cookies.set('mockGate', '1', { path: '/' });
    }
    res.cookies.set('mockRole', 'MEMBER', { path: '/' });
    res.cookies.set('mockName', 'Mock User', { path: '/' });
    return res;
  }
  
  if (pathname === '/api/auth/register' && request.method === 'POST') {
    // ══════════════════════════════════════════════════════════════════════════
    // BACKEND DEVELOPER INTEGRATION:
    // Here is the mock data. By this, these are the things that are redirecting to the next steps.
    // Replace this mock registration response with your actual backend API database insert, and return the new user object.
    // ══════════════════════════════════════════════════════════════════════════
    const res = NextResponse.json({ id: '1', name: payload.name, email: payload.email, role: payload.role || 'MEMBER' }, { status: 201 });
    res.cookies.set('mockRole', payload.role || 'MEMBER', { path: '/' });
    res.cookies.set('mockName', payload.name || 'Mock User', { path: '/' });
    return res;
  }

  if (pathname === '/api/auth/me') {
    // ══════════════════════════════════════════════════════════════════════════
    // BACKEND DEVELOPER INTEGRATION:
    // Here is the mock data. By this, these are the things that are redirecting to the next steps.
    // Replace this verification logic with a call to verify the session token from your database or JWT, returning the logged-in user profile.
    // ══════════════════════════════════════════════════════════════════════════
    const cookie = request.cookies.get('sessionId')?.value;
    const roleCookie = request.cookies.get('mockRole')?.value || 'MEMBER';
    const nameCookie = request.cookies.get('mockName')?.value || 'Mock User';
    if (cookie === 'mock_session') {
      return NextResponse.json({ id: '1', name: nameCookie, role: roleCookie });
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (pathname === '/api/auth/logout') {
    const res = NextResponse.json({ success: true });
    res.cookies.set('sessionId', '', { path: '/', maxAge: 0 });
    res.cookies.set('mockGate', '1', { path: '/', maxAge: 0 });
    return res;
  }

  if (pathname === '/api/onboarding/status') {
    // ══════════════════════════════════════════════════════════════════════════
    // BACKEND DEVELOPER INTEGRATION:
    // Here is the mock data. By this, these are the things that are redirecting to the next steps.
    // Replace this with a query to fetch the user's actual onboarding gate status from the database.
    // ══════════════════════════════════════════════════════════════════════════
    return NextResponse.json({ gate: currentGate, status: currentGate > 3 ? 'completed' : 'pending' });
  }

  if (pathname === '/api/users/me' && request.method === 'PATCH') {
    // ══════════════════════════════════════════════════════════════════════════
    // BACKEND DEVELOPER INTEGRATION:
    // Here is the mock data. By this, these are the things that are redirecting to the next steps.
    // Replace this with a database update statement to save the user's name, role, and progress to Gate 2.
    // ══════════════════════════════════════════════════════════════════════════
    const res = createResWithGate({ success: true }, 2);
    if (payload.role) {
      res.cookies.set('mockRole', payload.role, { path: '/' });
    }
    if (payload.name) {
      res.cookies.set('mockName', payload.name, { path: '/' });
    }
    return res;
  }

  if (pathname === '/api/companies') {
    return NextResponse.json([
      { id: 'c1', name: 'Google DeepMind', city: 'London' }, 
      { id: 'c2', name: 'Karzalay HQ', city: 'Mumbai' }
    ]);
  }

  if (pathname === '/api/applications' && request.method === 'POST') {
    // ══════════════════════════════════════════════════════════════════════════
    // BACKEND DEVELOPER INTEGRATION:
    // Here is the mock data. By this, these are the things that are redirecting to the next steps.
    // Replace this with an application insert in the database, associating the user with the company they chose.
    // ══════════════════════════════════════════════════════════════════════════
    // Keep gate at 2 to simulate waiting for approval
    return NextResponse.json({ success: true });
  }

  // --- DEV TOOLS ---
  if (pathname === '/api/dev/approve-application' && request.method === 'POST') {
    return createResWithGate({ success: true }, 3);
  }

  if (pathname === '/api/startups' && request.method === 'POST') {
    // ══════════════════════════════════════════════════════════════════════════
    // BACKEND DEVELOPER INTEGRATION:
    // Here is the mock data. By this, these are the things that are redirecting to the next steps.
    // Replace this with a new company record insert, setting the user's company ID, and updating the user gate to 3.
    // ══════════════════════════════════════════════════════════════════════════
    return createResWithGate({ success: true }, 3);
  }

  if (pathname === '/api/onboarding/complete' && request.method === 'POST') {
    // ══════════════════════════════════════════════════════════════════════════
    // BACKEND DEVELOPER INTEGRATION:
    // Here is the mock data. By this, these are the things that are redirecting to the next steps.
    // Replace this with a database update setting the user's gate to 4 (onboarding complete).
    // ══════════════════════════════════════════════════════════════════════════
    return createResWithGate({ success: true }, 4);
  }

  // --- STANDUP MOCK API ---
  const getCurrentDateKey = () => {
    const formatter = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' });
    return formatter.format(new Date()); // YYYY-MM-DD
  };

  if (pathname === '/api/standups' && request.method === 'GET') {
    const today = getCurrentDateKey();
    const standupCookie = request.cookies.get(`standup_${today}`)?.value;
    
    if (standupCookie) {
      try {
        const standupData = JSON.parse(standupCookie);
        return NextResponse.json({ standup: standupData });
      } catch (e) {}
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (pathname === '/api/standups' && request.method === 'POST') {
    // ══════════════════════════════════════════════════════════════════════════
    // BACKEND DEVELOPER INTEGRATION:
    // Here is the mock data. By this, these are the things that are redirecting to the next steps.
    // Replace this with an insert to your database standups table.
    // ══════════════════════════════════════════════════════════════════════════
    const today = getCurrentDateKey();
    
    if (!payload.yesterday || !payload.today || !payload.blockers) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const res = NextResponse.json({ success: true, message: 'Standup submitted successfully' }, { status: 201 });
    res.cookies.set(`standup_${today}`, JSON.stringify(payload), { path: '/' });
    res.cookies.set('mockGate', '4', { path: '/' }); // complete onboarding
    return res;
  }

  // --- CREDENTIAL VERIFICATION MOCK API ---
  if (pathname.startsWith('/api/verify/') && request.method === 'GET') {
    const userId = pathname.split('/').pop() || '';
    
    if (userId === 'not-found') {
      return NextResponse.json({ error: 'Credential not found' }, { status: 404 });
    }

    // Generate a mock 12-week contribution graph (84 days)
    const contributions = Array.from({ length: 84 }).map((_, i) => {
      // Create some realistic looking "intensity" clusters
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

    // Return a rich payload for the credential
    return NextResponse.json({
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
    });
  }

  // --- TALENT LEADERBOARD MOCK API ---
  if (pathname === '/api/talent' && request.method === 'GET') {
    return NextResponse.json([
      { id: 'kz-sarah-chen', name: 'Sarah Chen', role: 'Backend Lead', company: 'Nexus UI', rank: 1, attendance: 98, commits: 1420, signature: '0x7a3f...1b2a' },
      { id: 'kz-alex-rivera', name: 'Alex Rivera', role: 'Frontend Architect', company: 'Acme Corp', rank: 2, attendance: 97, commits: 1250, signature: '0x3b1c...4f9e' },
      { id: 'kz-maria-db', name: 'Maria DB', role: 'Database Admin', company: 'Nexus UI', rank: 3, attendance: 95, commits: 980, signature: '0x9a8b...2e3d' },
      { id: 'kz-mike-johnson', name: 'Mike Johnson', role: 'Product Designer', company: 'Nexus UI', rank: 4, attendance: 85, commits: 420, signature: '0x5f6e...8c9b' },
      { id: 'kz-john-doe', name: 'John Doe', role: 'Frontend Dev', company: 'Your Startup', rank: 5, attendance: 80, commits: 300, signature: '0x1c4d...7a3f' },
    ]);
  }

  // --- SPRINT & TICKETS MOCK API ---
  const INITIAL_TICKETS = [
    { id: 'KZ-101', title: 'Auth pages shipped (W2)', sprint: 'W3', priority: 'P1', status: 'not_started', assignee: { name: 'Alice', avatar: 'A', color: 'var(--primary)' }, description: 'Ensure the auth flow is completely stable.' },
    { id: 'KZ-102', title: 'Sprint board UI — sprint view', sprint: 'W3', priority: 'P2', status: 'not_started', assignee: { name: 'Bob', avatar: 'B', color: '#ff9800' } },
    { id: 'KZ-103', title: 'Sprint board design', sprint: 'W3', priority: 'P1', status: 'in_progress', assignee: { name: 'Charlie', avatar: 'C', color: '#4caf50' } },
    { id: 'KZ-104', title: 'Setup Database Models', sprint: 'W3', priority: 'P2', status: 'in_review', blocked: true, assignee: { name: 'Alice', avatar: 'A', color: 'var(--primary)' } },
  ];

  if (pathname === '/api/sprints/active') {
    return NextResponse.json({ id: 'sprint-1', week: 'W3', name: 'Sprint 3' });
  }

  if (pathname === '/api/tickets' && request.method === 'GET') {
    const mockTicketsCookie = request.cookies.get('mockTickets')?.value;
    let tickets = INITIAL_TICKETS;
    if (mockTicketsCookie) {
      try { tickets = JSON.parse(mockTicketsCookie); } catch(e) {}
    }
    const res = NextResponse.json(tickets);
    if (!mockTicketsCookie) {
      res.cookies.set('mockTickets', JSON.stringify(tickets), { path: '/' });
    }
    return res;
  }

  if (pathname.startsWith('/api/tickets/') && request.method === 'PATCH') {
    const ticketId = pathname.split('/').pop();
    const mockTicketsCookie = request.cookies.get('mockTickets')?.value;
    let tickets = INITIAL_TICKETS;
    if (mockTicketsCookie) {
      try { tickets = JSON.parse(mockTicketsCookie); } catch(e) {}
    }
    
    // Update ticket
    const ticketIndex = tickets.findIndex(t => t.id === ticketId);
    if (ticketIndex !== -1 && payload.status) {
      tickets[ticketIndex].status = payload.status;
    }

    const res = NextResponse.json({ success: true, ticket: tickets[ticketIndex] });
    res.cookies.set('mockTickets', JSON.stringify(tickets), { path: '/' });
    return res;
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
