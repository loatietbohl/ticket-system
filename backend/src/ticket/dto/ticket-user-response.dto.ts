import { Ticket } from '../entities/ticket.entity';

export type TicketUserResponseDto = Omit<Ticket, 'priority'>;
