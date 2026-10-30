import Link from 'next/link';
import { Navbar } from '@/components/ui/Navbar';
import styles from '@/components/EntryPaths.module.css';

export default function TeamEntryPage() {
  return <><Navbar /><main className={styles.section} style={{ paddingTop: 64 }}>
    <p className={styles.eyebrow}>Your team workspace</p>
    <h2>Work with your team.</h2>
    <div className={styles.grid}>
      <section className={styles.card}><h3>Already a member?</h3><p>Sign in with the account linked to your company. Your projects, tasks and workday will be waiting in your workspace.</p><a className={styles.primary} href="https://staging.karzalay.org/login?path=team">Sign in to my team →</a><small>If you&apos;re signed in with a personal account, sign out from that workspace first to use a different company account.</small></section>
      <section className={styles.card}><h3>Joining for the first time?</h3><p>Open the invitation link from your team administrator. New company registration is not available through this pilot yet.</p><Link className={styles.secondary} href="/#choose-path">Explore the individual path →</Link></section>
    </div>
  </main></>;
}

