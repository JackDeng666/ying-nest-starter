import { UserDto } from './../user/user.dto';
import {
  Get,
  Post,
  Request,
  Controller,
  Body,
  HttpException,
  HttpStatus,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthConstroller {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() user: UserDto) {
    const valUser = await this.authService.validateUser(user.username, user.password);
    if (valUser) {
      const userData = new UserDto();
      userData.id = valUser.id;
      userData.username = valUser.username;
      userData.email = valUser.email;
      return this.authService.login(userData);
    }
    throw new HttpException(
      { message: '登录失败，账号错误！' },
      HttpStatus.BAD_REQUEST,
    );
  }

  @Get('/userinfo')
  @SetMetadata('token', true)
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
