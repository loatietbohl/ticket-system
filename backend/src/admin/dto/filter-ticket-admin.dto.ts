import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { TicketPriority, TicketStatus } from '../../ticket/entities';

export class FilterTicketAdminDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;
}
