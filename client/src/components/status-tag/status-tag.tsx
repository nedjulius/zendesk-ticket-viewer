import React from 'react';
import {TicketStatus} from '../../lib/typings';
import {StatusTagProps} from './interfaces';
import styles from './status-tag.module.css';
import testIDs from '../../lib/test-ids';

export const StatusTag: React.FC<StatusTagProps> = React.memo(({status}) => {
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
        return styles.solved;
    }
  };

  return (
    <div
      className={`${styles.statusTag} ${getStatusTagClassName(status)}`}
      data-testid={testIDs.STATUS_TAG}
    >
      {status}
    </div>
  );
});
