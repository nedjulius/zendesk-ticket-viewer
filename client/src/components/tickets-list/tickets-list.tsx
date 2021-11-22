import React, {useEffect, useState} from 'react';
import {Ticket} from '../../lib/typings';
import {SERVER_URL} from '../../lib/constants';
import {useQuery} from '../../lib/hooks/use-query';
import {Paginator} from './paginator';
import {TicketItem} from './ticket-item';
import {ErrorMessage} from '../error-message';
import styles from './tickets-list.module.css';

export const TicketsList: React.FC = () => {
  const query = useQuery();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketCount, setTicketCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const currentPage = Number(query.get('page') ?? 1);

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${SERVER_URL}/tickets?page=${currentPage}`, {
        method: 'GET',
      });
      const data = await res.json();
      setTicketCount(data.count);
      setTickets(data.tickets);
    } catch (e) {
      console.error(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, [currentPage]);

  const mapTickets = tickets?.map(({id, status, subject, created_at, tags}) => {
    return (
      <TicketItem
        key={id}
        id={id}
        status={status}
        subject={subject}
        createdAt={created_at}
        tags={tags}
      />
    );
  });

  if (isError) {
    return <ErrorMessage />;
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div className={styles.ticketCount}>
        Total tickets found: {ticketCount}
      </div>
      <div>{mapTickets}</div>
      <Paginator currentPage={currentPage} itemCount={ticketCount} />
    </>
  );
};
