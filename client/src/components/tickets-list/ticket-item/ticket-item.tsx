import React from 'react';
import {TicketStatus} from '../../../lib/typings';
import {TicketItemProps} from './interfaces';
import styles from './ticket-item.module.css';

export const TicketItem: React.FC<TicketItemProps> = ({
  id,
  status,
  subject,
  createdAt,
  tags,
}) => {
  const formattedCreatedAtDate = new Date(createdAt).toLocaleString();

  const mapTags = tags.map(
    (tag, index) => `${tag}${index === tags.length - 1 ? '' : ', '}`
  );

  const getStatusTagClassName = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.OPEN:
        return styles.open;
      case TicketStatus.CLOSED:
        return styles.closed;
      case TicketStatus.NEW:
        return styles.new;
      case TicketStatus.PENDING:
        return styles.pending;
      case TicketStatus.HOLD:
        return styles.hold;
      case TicketStatus.SOLVED:
      default:
        return styles.solved;
    }
  };

  return (
    <div className={styles.ticketItemContainer}>
      <div className={styles.essentialData}>
        <div className={styles.idTag}>{id}</div>
        <div className={styles.subjectAndDateTag}>
          {subject} ({formattedCreatedAtDate})
        </div>
        <div className={`${styles.statusTag} ${getStatusTagClassName(status)}`}>
          {status}
        </div>
      </div>
      <div className={styles.tagsTag}>Tags: {mapTags}</div>
    </div>
  );
};
