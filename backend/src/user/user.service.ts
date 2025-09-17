import { Injectable } from '@nestjs/common';
import { User, users } from './entities/user.entities';

@Injectable()
export class UserService {
  private users: User[] = users;

  async findByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find((u) => u.email === email));
  }
}
