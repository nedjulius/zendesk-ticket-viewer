import React from 'react';
import loader from '../../assets/loader.svg';
import styles from './loader.module.css';
import testIDs from '../../lib/test-ids';

export const Loader: React.FC = () => (
  <div className={styles.loader} data-testid={testIDs.LOADER}>
    <img src={loader} alt="loading" />
  </div>
);
