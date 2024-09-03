import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import UserService from './users.service';
import UserDto from './dto/user.dto';

@Controller('dev')
@UseInterceptors()
export default class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }
  @Get(':id')
  async getUser(@Param() params: any) {
    return this.userService.findOne(params.id);
  }
  @Post()
  async createUser(@Body() user: UserDto) {
    return this.userService.create(user);
  }
  @Put(':id')
  async updateUser(@Param() params: any, @Body() user: UserDto) {
    return this.userService.update(params.id, user);
  }
  @Delete(':id')
  async deleteUser(@Param() params:any){
    return this.userService.delete(params.id);
  }
}
