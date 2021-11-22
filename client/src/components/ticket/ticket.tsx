import React from 'react';
import {useParams} from 'react-router';

export const Ticket: React.FC = () => {
  const {id} = useParams();

  return <div>Ticket {id}</div>;
};
