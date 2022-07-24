import { EmailService } from './../email/email.service';
// import { AccessGuard } from '../../common/guards/access.guard';
import { Controller, Get, Inject, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { TestService } from './test.service';

@Controller('test')
// @UseGuards(AccessGuard)
export class TestController {
  constructor(
    private readonly testService: TestService,
    private readonly emailService: EmailService,
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
}
