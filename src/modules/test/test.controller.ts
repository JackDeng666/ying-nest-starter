// import { AccessGuard } from '../../common/guards/access.guard';
import { Controller, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { TestService } from './test.service';

@Controller('test')
// @UseGuards(AccessGuard)
export class TestController {
  constructor(private readonly testService: TestService) {}

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
}
