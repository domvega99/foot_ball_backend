import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userData: CreateUserDto): Promise<User> {
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

  @Post('facebook/register')
  async facebookRegister(@Body() userData: CreateUserDto): Promise<any> {
    try {
      const registrationResult = await this.usersService.registerFacebookUser(userData);
      if (registrationResult.token) {
        return { token: registrationResult.token, user: registrationResult.user };
      } else {
        return registrationResult.user;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  async create(@Body() userData: CreateUserDto): Promise<User> {
    return this.usersService.create(userData);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(parseInt(id, 10), userData);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(+id);
  }
}
