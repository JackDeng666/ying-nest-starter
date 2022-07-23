import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  getHello(): string {
    return this.testService.getHello();
  }
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id): string {
    console.log(typeof id, id);
    return this.testService.getHello();
  }
}
