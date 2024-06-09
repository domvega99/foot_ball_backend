import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserDetails } from 'src/auth/auth.type';
import { JwtService } from '@nestjs/jwt';

interface RegistrationResponse {
  token?: string;
  user: User;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    const randomBytes = crypto.randomBytes(length);
    for (let i = 0; i < length; i++) {
      const randomIndex = randomBytes[i] % charactersLength;
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  async registerUser(userData: CreateUserDto): Promise<User> {  
    const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User();
    user.family_name = userData.family_name;
    user.given_name = userData.given_name;
    user.email = userData.email;
    user.password = hashedPassword;
    user.role = 'User';
    user.key = this.generateRandomString(20);
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }
  

  async registerGoogleUser(userData: UserDetails): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({  email: userData.email });
    if (existingUser) return existingUser;
    const user = new User();
    user.family_name = userData.family_name;
    user.given_name = userData.given_name;
    user.email = userData.email;
    user.role = 'User';
    user.provider = 'Google'
    user.socialId = userData.socialId;
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async registerFacebookUser(userData: UserDetails): Promise<RegistrationResponse> {
    const existingUser = await this.userRepository.findOneBy({ socialId: userData.socialId });
    if (existingUser) {
      const token = this.jwtService.sign(
        { socialId: existingUser.socialId, given_name: existingUser.given_name, sub: existingUser.id },
        { secret: existingUser.key }
      );
      console.log(token);
      return { token, user: existingUser }; 
    }
    const user = new User();
    user.family_name = userData.family_name;
    user.given_name = userData.given_name;
    user.email = userData.email;
    user.role = 'User';
    user.provider = 'Facebook';
    user.socialId = userData.socialId;
    user.key = this.generateRandomString(20);
    
    const savedUser = await this.userRepository.save(user);
    const token = this.jwtService.sign(
      { socialId: savedUser.socialId, given_name: savedUser.given_name },
      { secret: savedUser.key }
    );
    console.log(token);
    return { token, user: savedUser };
  }

  async create(userData: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User();
    user.family_name = userData.family_name;
    user.given_name = userData.given_name;
    user.email = userData.email;
    user.password = hashedPassword;
    user.role = userData.role;
    user.key = this.generateRandomString(20);
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const team = await this.userRepository.findOne({ where: { id: id } });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const team = await this.findById(id);
    return this.userRepository.save({ ...team, ...userData });
  }

  async remove(id: number): Promise<void> {
    const team = await this.findById(id);
    await this.userRepository.remove(team);
  }
}
