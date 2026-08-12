'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import styles from '../Auth.module.css';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Verification token missing.');
      return;
    }
    // Call verify-email API
    fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(async res => {
        if (res.ok) {
          const data = await res.json();
          setStatus('success');
          setMessage('Your email has been verified!');
          // Optionally redirect after a short delay
          setTimeout(() => router.push('/'), 2000);
        } else {
          const err = await res.json();
          setStatus('error');
          setMessage(err.error || 'Verification failed');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Network error');
      });
  }, []);

  return (
    <Card padded shadow className={styles.card}>
      <h1 className={styles.title}>Email Verification</h1>
      {status === 'loading' && <p>Verifying...</p>}
      {status !== 'loading' && <p>{message}</p>}
      {status === 'success' && (
        <Button variant="primary" onClick={() => router.push('/')}>Go to Dashboard</Button>
      )}
    </Card>
  );
}
