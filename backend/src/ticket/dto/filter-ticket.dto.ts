import { IsEmail } from 'class-validator';

export class FilterTicketDto {
  @IsEmail()
  email: string;
}
