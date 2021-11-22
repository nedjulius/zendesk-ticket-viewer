import {useEffect, useState} from 'react';
import {fetchTicketsApi} from '../fetch-tickets-api';

export const useFetch = <T extends unknown, N extends unknown>(
  uri: string,
  dependencies: N[] = []
): {data: T | null; isLoading: boolean; isError: boolean} => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);

  const fetchApi = async () => {
    try {
      setIsLoading(true);
      const data = await fetchTicketsApi<T>(uri);
      setData(data);
    } catch (e) {
      console.error(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, dependencies);

  return {
    isLoading,
    isError,
    data,
  };
};
