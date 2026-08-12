import React from 'react';
import { Card } from '@/components/ui/Card';
import styles from './CompanyCard.module.css';

interface Company {
  id: string;
  name: string;
  city: string;
  members: number;
  sprintWeek: string;
}

export const CompanyCard: React.FC<{ company: Company }> = ({ company }) => {
  return (
    <Card className={styles.card} padded shadow>
      <h3 className={styles.title}>{company.name}</h3>
      <p className={styles.city}>City: {company.city}</p>
      <p className={styles.members}>Members: {company.members}</p>
      <p className={styles.sprint}>Sprint Week: {company.sprintWeek}</p>
    </Card>
  );
};
