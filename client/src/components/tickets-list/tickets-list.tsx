import React from 'react';
import {useQuery} from '../../lib/hooks/use-query';
import {Paginator} from './paginator';
import {TicketItem} from './ticket-item';
import {ErrorMessage} from '../error-message';
import {Loader} from '../loader';
import styles from './tickets-list.module.css';
import {useTickets} from '../../lib/hooks/use-tickets';
import {useScrollToTop} from '../../lib/hooks/use-scroll-to-top';
import testIDs from '../../lib/test-ids';

export const TicketsList: React.FC = () => {
  const currentPage = Number(useQuery().get('page') ?? 1);
  const {data, isLoading, isError} = useTickets(currentPage);

  useScrollToTop([isLoading]);

  const ticketCount = data?.count ?? 0;
  const tickets = data?.tickets ?? [];

  const mapTickets = tickets.map(({id, status, subject, created_at, tags}) => (
    <TicketItem
      key={id}
      id={id}
      status={status}
      subject={subject}
      createdAt={created_at}
      tags={tags}
    />
  ));

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <>
      {!!ticketCount && (
        <div
          className={styles.ticketCount}
          data-testid={testIDs.TICKETS_LIST_RESULT_TEXT}
        >
          Total tickets: {ticketCount}, showing: {tickets.length}
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : !tickets.length ? (
        <p data-testid={testIDs.TICKETS_LIST_EMPTY_MESSAGE}>
          No tickets found.
        </p>
      ) : (
        mapTickets
      )}
      {!!ticketCount && (
        <Paginator currentPage={currentPage} itemCount={ticketCount} />
      )}
    </>
  );
};
