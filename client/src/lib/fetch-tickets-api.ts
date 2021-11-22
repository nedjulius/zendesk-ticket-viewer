import {SERVER_URL} from './constants';

export const fetchTicketsApi = async <T extends unknown>(
  uri: string
): Promise<T> => {
  const res = await fetch(`${SERVER_URL}${uri}`, {method: 'GET'});
  const data = await res.json();

  return data;
};
