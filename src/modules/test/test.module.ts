import { UploadModule } from './../upload/upload.module';
import { EmailModule } from './../email/email.module';
import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [EmailModule, UploadModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
