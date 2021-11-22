import {useFetch} from './use-fetch';
import {GetTicketsResponse} from '../typings';

export const useTickets = (
  currentPage: number
): {data: GetTicketsResponse | null; isLoading: boolean; isError: boolean} => {
  return useFetch<GetTicketsResponse, number>(`/tickets?page=${currentPage}`, [
    currentPage,
  ]);
};
