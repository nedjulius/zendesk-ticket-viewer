import {useFetch} from './use-fetch';
import {GetTicketResponse} from '../typings';

export const useTicket = (
  id: number
): {data: GetTicketResponse | null; isLoading: boolean; isError: boolean} => {
  return useFetch<GetTicketResponse, number>(`/tickets/${id}`, [id]);
};
