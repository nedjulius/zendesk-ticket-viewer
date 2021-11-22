import React from 'react';
import styles from './error-message.module.css';
import testIDs from '../../lib/test-ids';

export const ErrorMessage: React.FC = () => (
  <div className={styles.errorMessage} data-testid={testIDs.ERROR_MESSAGE}>
    An unexpected error occurred!
  </div>
);
