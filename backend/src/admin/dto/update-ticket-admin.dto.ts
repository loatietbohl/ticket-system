import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import {
  TicketPriority,
  TicketStatus,
} from '../../ticket/entities/ticket.entity';

export class UpdateTicketAdminDto {
  @IsEnum(TicketStatus)
  status: TicketStatus;

  @IsEnum(TicketPriority)
  priority: TicketPriority;

  @IsNotEmpty()
  @IsString()
  message: string;
}
