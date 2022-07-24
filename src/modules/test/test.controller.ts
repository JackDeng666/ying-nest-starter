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
  UseInterceptors,
} from '@nestjs/common';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { TestService } from './test.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('test')
// @UseGuards(AccessGuard)
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly emailService: EmailService,
    private readonly uploadService: UploadService,
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
}
