import React from 'react';
import styles from './header.module.css';

export const Header: React.FC = () => (
  <header className={styles.headerStrip}>
    <h1 className={styles.heading}>Zendesk Ticket Viewer</h1>
  </header>
);
