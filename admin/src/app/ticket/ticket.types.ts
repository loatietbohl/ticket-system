export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TicketStatus = 'open' | 'in_progress' | 'closed';

export type TicketHistory = {
  id: number;
  email: string;
  message: string;
  createdAt: string;
};

export type TicketsResponse = {
  id: number;
  email: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
};

export type TicketHistoryResponse = TicketsResponse & {
  history: TicketHistory[];
};
