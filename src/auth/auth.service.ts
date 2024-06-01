import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserDetails } from './auth.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(details: UserDetails) {
    console.log('AuthService');
    console.log(details);
    const user = await this.userRepository.findOneBy({
      email: details.email
    });
    console.log(user);
    if (user) return user;
    console.log('User not found. Creating ....')
    const newUser = this.userRepository.create({
      given_name: details.given_name,
      family_name: details.family_name,
      email: details.email,
      facebookId: details.facebookId,
      picture: details.picture || null,
      provider: 'Google',
      role: details.role || 'User', 
      key: details.key || null,  
    });
    return this.userRepository.save(newUser);
  }

  async validateFBUser(details: UserDetails): Promise<User> {
    console.log('AuthService: Validating FB User');
    console.log(details);
    const user = await this.userRepository.findOneBy({
      facebookId: details.facebookId,
    });
    if (user) {
      console.log('User found');
      return user;
    }

    console.log('User not found. Creating ...');
    const newUser = this.userRepository.create({
      given_name: details.given_name,
      family_name: details.family_name,
      email: details.email,
      facebookId: details.facebookId,
      picture: details.picture || null,
      provider: 'Facebook',
      role: details.role || 'User', 
      key: details.key || null, 
    });

    return this.userRepository.save(newUser);
  }

  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async loginUser(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    // Find the user by email
    const user = await this.userRepository.findOne({ where: { email } });
    // Check if the user exists
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // Generate and return JWT token
    const accessToken = this.generateJwtToken(user.id, user.email, user.given_name);
    return { accessToken };
  }

  private generateJwtToken(sid: number, email: string, given_name: string): string {
    const payload = { sid, email, given_name };
    return this.jwtService.sign(payload);
  }
  

}
