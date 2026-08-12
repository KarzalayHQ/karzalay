import React from 'react';
import { Card } from '@/components/ui/Card';

export default function SprintBoardPreview() {
  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-family, sans-serif)' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 600 }}>Active Sprint (W3)</h1>
        <p style={{ color: 'var(--text-muted)' }}>Sprint board design preview with all states.</p>
      </header>

      {/* Board Layout */}
      <div id="full-board" style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem' }}>
        
        {/* Column 1: Not Started */}
        <div style={{ flex: '0 0 320px', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--surface-sunken, #f8f9fa)', padding: '1rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Not Started</h3>
            <span className="kz-badge" style={{ background: 'var(--border)', color: 'var(--foreground)' }}>3</span>
          </div>

          <Card id="single-ticket" padded shadow style={{ cursor: 'pointer', borderLeft: '4px solid gray' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="kz-badge" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>P1</span>
              <span className="kz-badge" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>W3</span>
            </div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.3 }}>Auth pages shipped (W2)</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--primary)', color: 'var(--primary-foreground)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>A</div>
              Alice
            </div>
          </Card>

          <Card padded shadow style={{ cursor: 'pointer', borderLeft: '4px solid gray' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="kz-badge" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>P2</span>
              <span className="kz-badge" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>W3</span>
            </div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.3 }}>Sprint board UI — sprint view</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#ff9800', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>B</div>
              Bob
            </div>
          </Card>
        </div>

        {/* Column 2: In Progress */}
        <div style={{ flex: '0 0 320px', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--surface-sunken, #f8f9fa)', padding: '1rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--primary)' }}>In Progress</h3>
            <span className="kz-badge" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>1</span>
          </div>

          <Card id="drag-ticket" padded style={{ cursor: 'grab', transform: 'rotate(2deg) translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.15)', border: '1px solid var(--primary)', borderLeft: '4px solid var(--primary)', zIndex: 10 }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="kz-badge" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>P1</span>
              <span className="kz-badge" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>W3</span>
            </div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.3 }}>Sprint board design</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#4caf50', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>C</div>
              Charlie
            </div>
          </Card>
        </div>

        {/* Column 3: In Review */}
        <div style={{ flex: '0 0 320px', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--surface-sunken, #f8f9fa)', padding: '1rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: '#ff9800' }}>In Review</h3>
            <span className="kz-badge" style={{ background: '#ff9800', color: '#fff' }}>1</span>
          </div>

          <Card padded shadow style={{ cursor: 'pointer', borderLeft: '4px solid #ff9800' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="kz-badge" style={{ background: 'var(--destructive)', color: 'var(--destructive-foreground)' }}>Blocked</span>
            </div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.3 }}>Setup Database Models</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--primary)', color: 'var(--primary-foreground)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>A</div>
              Alice
            </div>
          </Card>
        </div>

        {/* Column 4: Done (Empty State) */}
        <div id="empty-board" style={{ flex: '0 0 320px', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--surface-sunken, #f8f9fa)', padding: '1rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', color: '#4caf50' }}>Done</h3>
            <span className="kz-badge" style={{ background: 'var(--border)', color: 'var(--foreground)' }}>0</span>
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', border: '2px dashed var(--border)', borderRadius: '8px', opacity: 0.7 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Nothing here yet.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
