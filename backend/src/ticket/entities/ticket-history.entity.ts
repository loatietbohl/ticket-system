import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity('ticket_history')
export class TicketHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.history, {
    onDelete: 'CASCADE',
  })
  ticket: Ticket;

  @Column()
  email: string;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
