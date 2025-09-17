import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login-dto';

export type JwtPayload = {
  email: string;
  sub: number;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
      return { id: user.id };
    }
    return null;
  }

  login(userId: number, email: LoginDto['email']) {
    const payload: JwtPayload = { email, sub: userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
