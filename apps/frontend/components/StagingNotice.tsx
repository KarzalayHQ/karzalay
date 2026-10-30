export function StagingNotice() {
  return (
    <aside aria-label="Staging preview" style={{ background: '#211538', color: '#fff', padding: '12px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '10px 24px', fontSize: '13px', lineHeight: 1.6 }}>
      <span><strong>Staging beta.</strong> Personal enrollment is open. Companies, profiles, metrics and credentials shown here are examples.</span>
      <a href="https://staging.karzalay.org/login" style={{ color: '#fff', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: '4px', whiteSpace: 'nowrap' }}>Open workspace →</a>
    </aside>
  );
}
