export enum TicketType {
  PROBLEM = 'problem',
  INCIDENT = 'incident',
  QUESTION = 'question',
  TASK = 'task',
}

export enum TicketPriority {
  URGENT = 'urgent',
  HIGH = 'high',
  NORMAL = 'normal',
  LOW = 'low',
}

export enum TicketStatus {
  NEW = 'new',
  OPEN = 'open',
  PENDING = 'pending',
  HOLD = 'hold',
  SOLVED = 'solved',
  CLOSED = 'closed',
}

export enum TicketSatisfactionRating {
  OFFERED = 'offered',
  UNOFFERED = 'unoffered',
}

export interface Ticket {
  url: string;
  id: number;
  external_id: string | null;
  created_at: string;
  updated_at: string;
  type: TicketType;
  subject: string;
  raw_subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  recipient: string | null;
  requester_id: number;
  submitter_id: number;
  assignee_id: number;
  organization_id: number | null;
  group_id: number;
  collaborator_ids: number[];
  follower_ids: number[];
  email_cc_ids: number[];
  has_incidents: boolean;
  is_public: boolean;
  due_at: string | null;
  tags: string[];
  custom_fields: string[];
  satisfaction_rating: TicketSatisfactionRating | null;
  sharing_agreement_ids: number[];
  fields: string[];
  followup_ids: number[];
  ticket_form_id: number;
  brand_id: number;
  allow_channelback: boolean;
  allow_attachments: boolean;
}

export interface GetTicketsResponse {
  tickets: Ticket[];
  count: number;
}
