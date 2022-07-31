import { UserDto } from './../user/user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserDto> {
    const user = await this.userService.findByUsername(username);
    if (user && this.userService.comparePass(password, user.password)) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    }
    return null;
  }

  async login(user: UserDto): Promise<any> {
    return {
      token: this.jwtService.sign(classToPlain(user)),
    };
  }

  verify(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new HttpException(
        { message: 'token无效！' + error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
