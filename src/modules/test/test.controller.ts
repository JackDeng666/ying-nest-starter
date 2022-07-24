import { UploadService } from './../upload/upload.service';
import { EmailService } from './../email/email.service';
// import { AccessGuard } from '../../common/guards/access.guard';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request
} from '@nestjs/common';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { TestService } from './test.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('test')
// @UseGuards(AccessGuard)
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly emailService: EmailService,
    private readonly uploadService: UploadService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @Permissions('sys:test:gethello')
  getHello(): string {
    return this.testService.getHello();
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id): string {
    console.log(typeof id, id);
    return this.testService.getHello();
  }

  @Post('email')
  sendEmail() {
    return this.emailService.sendEmail();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return await this.uploadService.saveFile(file);
  }

  // 登录测试
  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // 测试登录后才可访问的接口，在需要的地方使用守卫，可保证必须携带token才能访问
  @UseGuards(AuthGuard('jwt'))
  @Get('/auth/userinfo')
  getProfile(@Request() req) {
    return req.user;
  }
}
