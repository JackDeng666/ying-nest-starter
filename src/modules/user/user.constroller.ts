import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @Permissions('sys:user:get')
  async getUserById(@Param('id') id: string) {
    return this.userService.findByPk(id);
  }

  @Get()
  @Permissions('sys:user:get')
  async getAllUser() {
    return await this.userService.findAll();
  }

  @Post()
  @Permissions('sys:user:create')
  async createUser(@Body() userDto: UserDto) {
    return await this.userService.create(userDto);
  }

  @Delete(':id')
  @Permissions('sys:user:del')
  async delUser(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
