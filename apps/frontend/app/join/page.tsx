import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';

export default function JoinPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 24px 100px' }}>
        <p style={{ color: '#6C3CE0', fontWeight: 700 }}>THE NEXT CHAPTER OF KARZALAY</p>
        <h1 style={{ fontSize: 'clamp(36px, 7vw, 64px)', lineHeight: 1.1, letterSpacing: '-0.04em', margin: '20px 0' }}>Your work can start<br />before you join a company.</h1>
        <p style={{ fontSize: '20px', lineHeight: 1.65, maxWidth: '680px', color: '#5A5270' }}>We’re building a personal workspace where you can turn an idea into a project, keep track of your progress, and collect evidence of what you create. Joining a company will be optional.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '40px 0' }}>
          {[
            ['Build independently', 'Plan your own projects and tasks without needing a company invitation.'],
            ['Show the work', 'Attach code, designs, writing, or research to your completed work.'],
            ['Grow into a team', 'Keep your personal work when you later join a company or collaborate.'],
          ].map(([title, description]) => (
            <section key={title} style={{ background: '#F6F4FF', borderRadius: '20px', padding: '24px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>{title}</h2>
              <p style={{ color: '#5A5270', lineHeight: 1.6 }}>{description}</p>
            </section>
          ))}
        </div>
        <section style={{ border: '1px solid #DDD5EF', borderRadius: '20px', padding: '24px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '12px' }}>Personal enrollment is being prepared</h2>
          <p style={{ color: '#5A5270', lineHeight: 1.6 }}>This preview does not create accounts or issue credentials. Existing invited Karzalay team members can sign in to the workspace today.</p>
          <a href="https://staging.karzalay.org/login" style={{ display: 'inline-block', marginTop: '20px', padding: '14px 22px', background: '#6C3CE0', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontWeight: 700 }}>Open team workspace →</a>
        </section>
        <Link href="/" style={{ display: 'inline-block', marginTop: '28px', color: '#6C3CE0' }}>← Back to Karzalay</Link>
      </main>
    </>
  );
}
