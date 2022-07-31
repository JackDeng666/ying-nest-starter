import { AuthModule } from './../auth/auth.module';
import { UploadModule } from './../upload/upload.module';
import { EmailModule } from './../email/email.module';
import { Module } from '@nestjs/common';
import { TestController } from './test.controller';

@Module({
  imports: [EmailModule, UploadModule, AuthModule],
  controllers: [TestController],
  exports: [AuthModule],
})
export class TestModule {}
