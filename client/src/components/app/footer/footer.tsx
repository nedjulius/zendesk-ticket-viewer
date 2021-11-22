import React from 'react';
import styles from './footer.module.css';

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    Created by{' '}
    <a href="https://github.com/nedjulius" target="_blank" rel="noreferrer">
      Julius Nedzinskas
    </a>
  </footer>
);
