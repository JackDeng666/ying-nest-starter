import { UserDto } from './user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(user: UserDto) {
    return await this.userModel.create(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ where: { username } });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async remove(id: string) {
    return await this.userModel.destroy({ where: { id } });
  }
}
