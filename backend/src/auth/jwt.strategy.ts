import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './auth.service';
import { User } from 'src/user/entities/user.entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'remember-to-drink-water',
    });
  }

  async validate(payload: JwtPayload): Promise<User | undefined> {
    const user = await this.usersService.findByEmail(payload.email);
    return user;
  }
}
