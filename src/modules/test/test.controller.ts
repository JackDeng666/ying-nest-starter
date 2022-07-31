import { UploadService } from './../upload/upload.service';
import { EmailService } from './../email/email.service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('test')
export class TestController {
  constructor(
    private readonly emailService: EmailService,
    private readonly uploadService: UploadService,
  ) {}

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
