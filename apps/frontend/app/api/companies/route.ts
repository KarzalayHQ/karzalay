import { NextResponse } from 'next/server';

// ══════════════════════════════════════════════════════════════════════════
// BACKEND DEVELOPER INTEGRATION:
// Here is the mock data. By this, these are the things that are redirecting to the next steps.
// Replace this hardcoded companies array with a database query retrieving all active companies from the database.
// ══════════════════════════════════════════════════════════════════════════
const companies = [
  { id: '1',  name: 'Acme Corp',        city: 'Mumbai',    memberCount: 12, sprintWeek: 'W7' },
  { id: '2',  name: 'Beta Ventures',    city: 'Delhi',     memberCount: 8,  sprintWeek: 'W7' },
  { id: '3',  name: 'Gamma Studio',     city: 'Bengaluru', memberCount: 15, sprintWeek: 'W7' },
  { id: '4',  name: 'Delta Labs',       city: 'Hyderabad', memberCount: 5,  sprintWeek: 'W6' },
  { id: '5',  name: 'Epsilon Build',    city: 'Pune',      memberCount: 9,  sprintWeek: 'W7' },
  { id: '6',  name: 'Zeta Works',       city: 'Mumbai',    memberCount: 7,  sprintWeek: 'W6' },
  { id: '7',  name: 'Eta Innovations',  city: 'Chennai',   memberCount: 11, sprintWeek: 'W7' },
  { id: '8',  name: 'Theta Digital',    city: 'Kolkata',   memberCount: 6,  sprintWeek: 'W6' },
  { id: '9',  name: 'Iota Systems',     city: 'Bengaluru', memberCount: 20, sprintWeek: 'W7' },
  { id: '10', name: 'Kappa Founders',   city: 'Delhi',     memberCount: 4,  sprintWeek: 'W5' },
];

export async function GET() {
  return NextResponse.json(companies);
}
