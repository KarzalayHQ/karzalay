import Link from 'next/link';
import styles from './EntryPaths.module.css';

export function EntryPaths() {
  return <section id="choose-path" aria-labelledby="entry-paths-title" className={styles.section}>
    <p className={styles.eyebrow}>Your next step</p>
    <h2 id="entry-paths-title">One Karzalay. Two ways to begin.</h2>
    <div className={styles.grid}>
      <article className={styles.card}>
        <span className={styles.label}>For individuals</span>
        <h3>Build my experience</h3>
        <p>Choose a practice brief, follow a clear starting plan and keep evidence of your contribution. No company invitation or AI key needed.</p>
        <a className={styles.primary} href="https://staging.karzalay.org/enroll">Build my experience →</a>
        <a className={styles.returnLink} href="https://staging.karzalay.org/personal">Already joined? Open my personal workspace →</a>
        <small>Practice and self-reported evidence, not employment certification.</small>
      </article>
      <article className={styles.card}>
        <span className={styles.label}>For teams</span>
        <h3>Work with my team</h3>
        <p>Open your team&apos;s workspace for projects, tasks and daily work. New members join through an invitation from their team administrator.</p>
        <Link className={styles.secondary} href="/team">Work with my team →</Link>
        <small>For existing teams and invited members.</small>
      </article>
    </div>
  </section>;
}

