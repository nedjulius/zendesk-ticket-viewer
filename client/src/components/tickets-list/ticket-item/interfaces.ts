import {TicketStatus} from '../../../lib/typings';

export interface TicketItemProps {
  id: number;
  status: TicketStatus;
  subject: string;
  createdAt: string;
  tags: string[];
}
