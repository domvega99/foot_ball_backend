import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from 'src/football/teams/entities/team.entity';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

    // Check if the email already exists
    const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user entity
    const user = new User();
    user.family_name = userData.family_name;
    user.given_name = userData.given_name;
    user.email = userData.email;
    user.password = hashedPassword;
    user.role = 'User';
    user.key = this.generateRandomString(20);

    // Save the user to the database
    const savedUser = await this.userRepository.save(user);

    // Return the saved user data
    return savedUser;
  }

  // async findAll(): Promise<Team[]> {
  //   return this.teamRepository.find();
  // }

  // async findById(id: number): Promise<Team> {
  //   const team = await this.teamRepository.findOne({ where: { id: id } });
  //   if (!team) {
  //     throw new NotFoundException('Team not found');
  //   }
  //   return team;
  // }

  // async update(id: number, teamData: Partial<Team>): Promise<Team> {
  //   const team = await this.findById(id);
  //   return this.teamRepository.save({ ...team, ...teamData });
  // }

  // async remove(id: number): Promise<void> {
  //   const team = await this.findById(id);
  //   await this.teamRepository.remove(team);
  // }
}
