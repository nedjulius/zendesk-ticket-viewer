import React, {useEffect, useState} from 'react';
import {Ticket} from '../../lib/typings';
import {SERVER_URL} from '../../lib/constants';

export const TicketsList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchAPI = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${SERVER_URL}/tickets`, {method: 'GET'});
      const data = await res.json();
      setCount(data.count);
      setTickets(data.tickets)
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  console.log(tickets);

  if (isError) {
    <p>An error occured</p>;
  }

  return isLoading ? <p>Loading...</p> : <div>{count}</div>
};
