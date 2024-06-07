import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() userData: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.registerUser(userData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('google/register')
  async googleRegister(@Body() userData: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.registerGoogleUser(userData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
