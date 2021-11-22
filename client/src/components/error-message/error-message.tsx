import React from 'react';
import styles from './error-message.module.css';

export const ErrorMessage: React.FC = () => (
  <div className={styles.errorMessage}>An unexpected error occurred!</div>
);
