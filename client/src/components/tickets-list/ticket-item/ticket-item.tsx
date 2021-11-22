import React from 'react';
import {Link} from 'react-router-dom';
import {getDateString} from '../../../lib/utils/get-date-string';
import {StatusTag} from '../../status-tag';
import {TicketItemProps} from './interfaces';
import styles from './ticket-item.module.css';

export const TicketItem: React.FC<TicketItemProps> = React.memo(
  ({id, status, subject, createdAt, tags}) => {
    const formattedCreatedAtDate = getDateString(createdAt);

    const mapTags = tags.map(
      (tag, index) => `${tag}${index === tags.length - 1 ? '' : ', '}`
    );

    return (
      <Link to={`/ticket/${id}`} className={styles.ticketItemContainer}>
        <div className={styles.essentialData}>
          <div className={styles.idTag}>{id}</div>
          <div className={styles.subjectAndDateTag}>
            {subject} ({formattedCreatedAtDate})
          </div>
          <StatusTag status={status} />
        </div>
        <div className={styles.tagsTag}>Tags: {mapTags}</div>
      </Link>
    );
  }
);
