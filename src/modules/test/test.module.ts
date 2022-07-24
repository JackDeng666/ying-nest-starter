import { EmailModule } from './../email/email.module';
import { EmailService } from './../email/email.service';
import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [EmailModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
