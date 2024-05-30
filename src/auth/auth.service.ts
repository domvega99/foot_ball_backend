import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserDetails } from './auth.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository:
    Repository<User>,
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
      picture: details.picture,
      email: details.email,
    });
    return this.userRepository.save(newUser);
  }

  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

}
