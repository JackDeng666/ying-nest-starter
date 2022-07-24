import { UserDto } from './../user/user.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserDto> {
    const user = await this.userService.findOne(username);
    if (user && user.password == password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto): Promise<any> {
    return {
      token: this.jwtService.sign(user),
    };
  }
}
