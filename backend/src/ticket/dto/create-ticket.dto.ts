import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
