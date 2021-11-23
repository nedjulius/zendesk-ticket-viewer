import React from 'react';
import {Link} from 'react-router-dom';
import {getDateString} from '../../../lib/utils/get-date-string';
import {StatusTag} from '../../status-tag';
import {TicketItemProps} from './interfaces';
import styles from './ticket-item.module.css';
import testIDs from '../../../lib/test-ids';

export const TicketItem: React.FC<TicketItemProps> = React.memo(
  ({id, status, subject, createdAt, tags}) => {
    const formattedCreatedAtDate = getDateString(createdAt);

    const mapTags = tags.join(', ');

    return (
      <Link
        to={`/ticket/${id}`}
        className={styles.ticketItemContainer}
        data-testid={testIDs.TICKET_ITEM}
      >
        <div className={styles.essentialData}>
          <div className={styles.idTag} data-testid={testIDs.TICKET_ITEM_ID}>
            {id}
          </div>
          <div
            className={styles.subjectAndDateTag}
            data-testid={testIDs.TICKET_ITEM_SUBJECT_AND_DATE}
          >
            {subject} ({formattedCreatedAtDate})
          </div>
          <StatusTag status={status} />
        </div>
        <div className={styles.tagsTag} data-testid={testIDs.TICKET_ITEM_TAGS}>
          Tags: {mapTags}
        </div>
      </Link>
    );
  }
);
