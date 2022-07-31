import { UserDto } from './user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly configService: ConfigService,
  ) {}

  async create(userDto: UserDto) {
    const user = plainToClass(User, userDto);
    user.password = this.generatePass(user.password);
    return await user.save();
  }

  async findByPk(id: string): Promise<User | undefined> {
    return await this.userModel.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ where: { username } });
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async remove(id: string) {
    return await this.userModel.destroy({ where: { id } });
  }

  generatePass(pass) {
    const sha1 = crypto.createHash('sha1');
    const ciphertext = sha1
      .update(
        this.configService.get('SALT1') +
          pass +
          this.configService.get('SALT2'),
      )
      .digest('hex');
    return ciphertext;
  }

  comparePass(pass, encryptPass) {
    const sha1 = crypto.createHash('sha1');
    const ciphertext = sha1
      .update(
        this.configService.get('SALT1') +
          pass +
          this.configService.get('SALT2'),
      )
      .digest('hex');
    return ciphertext === encryptPass;
  }
}
