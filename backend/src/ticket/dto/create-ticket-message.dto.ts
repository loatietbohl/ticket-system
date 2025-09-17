import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketMessageDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
