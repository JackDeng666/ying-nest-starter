import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'admin',
        password: '123456',
      },
      {
        userId: 2,
        username: 'JackDeng',
        password: '123456',
      },
      {
        userId: 3,
        username: 'gg',
        password: 'gg',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
