import React from 'react';
import {Link} from 'react-router-dom';
import styles from './header.module.css';

export const Header: React.FC = () => (
  <header className={styles.headerStrip}>
    <Link to="/">
      <h1 className={styles.heading}>Zendesk Ticket Viewer</h1>
    </Link>
  </header>
);
