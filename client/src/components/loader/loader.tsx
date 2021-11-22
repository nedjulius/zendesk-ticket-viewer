import React from 'react';
import loader from '../../assets/loader.svg';
import styles from './loader.module.css';

export const Loader: React.FC = () => (
  <div className={styles.loader}>
    <img src={loader} alt="loading" />
  </div>
);
