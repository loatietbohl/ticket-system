export type TicketHistoryResponse = {
  id: number;
  title: string;
  email: string;
  status: string;
  history: {
    id: number;
    email: string;
    message: string;
    createdAt: string;
  }[];
};

export type TicketMessageResponse = {
  id: number;
  email: string;
  message: string;
  createdAt: string;
  ticket: {
    id: number;
  };
};
