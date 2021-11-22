import React from 'react';
import {useParams} from 'react-router';
import {useTicket} from '../../lib/hooks/use-ticket';
import {getDateString} from '../../lib/utils/get-date-string';
import {ErrorMessage} from '../error-message';
import {Loader} from '../loader';
import {StatusTag} from '../status-tag';
import styles from './ticket.module.css';

export const Ticket: React.FC = () => {
  const {id} = useParams();
  const {data, isLoading, isError} = useTicket(Number(id));

  const checkValueValidity = (value: unknown): string =>
    value ? String(value) : 'Unknown';

  if (isError) {
    return <ErrorMessage />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.row}>
        <strong>ID</strong>
        <span>{checkValueValidity(data?.id)}</span>
      </div>
      <div className={styles.row}>
        <strong>Subject</strong>
        <span>{checkValueValidity(data?.subject)}</span>
      </div>
      <div className={styles.row}>
        <strong className={styles.description}>Description</strong>
        <span>{checkValueValidity(data?.description)}</span>
      </div>
      <div className={styles.row}>
        <strong>Created at</strong>
        <span>{getDateString(data?.created_at ?? '')}</span>
      </div>
      <div className={styles.row}>
        <strong>Status</strong>
        <StatusTag status={data?.status} />
      </div>
      <div className={styles.row}>
        <strong>Organization ID</strong>
        <span>{checkValueValidity(data?.organization_id)}</span>
      </div>
      <div className={styles.row}>
        <strong>Group ID</strong>
        <span>{checkValueValidity(data?.group_id)}</span>
      </div>
      <div className={styles.row}>
        <strong>Submitter ID</strong>
        <span>{checkValueValidity(data?.submitter_id)}</span>
      </div>
      <div className={styles.row}>
        <strong>Assignee ID</strong>
        <span>{checkValueValidity(data?.assignee_id)}</span>
      </div>
    </>
  );
};
