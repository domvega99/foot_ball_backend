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
  private readonly JWT_SECRET = 'secretkeyjwt';
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService,) {}

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return { msg: 'Facebook Authentication' };
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback(@Req() req): Promise<any> {

    const user = req.user;
    const payload = {
      sub: user.id,
      fid: user.facebookId,
      given_name: user.first_name,
    };
    const token = jwt.sign(payload, this.JWT_SECRET);

    return token;
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleLoginRedirect(@Req() req: any, @Res() res: any) {
    // Handles the Google OAuth2 callback and sets JWT token in cookie
    const user: User = req.user;
    const payload = {
      sub: user.id,
      email: user.email,
      given_name: user.given_name,
    };
    const token = jwt.sign(payload, this.JWT_SECRET);
    res.cookie('key', token);
    const redirectUrl = this.configService.get<string>('CLIENT_URL');
    res.redirect(redirectUrl);
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log(request);
    if (request) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }

  }

  @Get('google/user')
  @UseGuards(GoogleAuthGuard)
  getUser(@Req() req: any): User {
    return req.user as User;
  }

  @Get('google/logout')
  async logout(@Req() req, @Res() res: any) {
    res.clearCookie('key');
    req.session = null;
    res.status(200).json({ message: 'Logout successful' });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.loginUser(loginDto);
  }
}
