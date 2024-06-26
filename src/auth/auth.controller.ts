import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { GoogleAuthGuard } from './utils/Guards';
import { User } from 'src/types/user.interface';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService,) {}

  @Get('logout')
  async logout(@Req() req, @Res() res: any) {
    res.clearCookie('key', { path: '/' }); // Make sure to specify the path if needed
    req.session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed', error: err });
      }
      res.status(200).json({ message: 'Logout successful' });
      console.log('Logout successful');
    });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.loginUser(loginDto);
  }
}
