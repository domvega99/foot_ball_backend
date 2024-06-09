import { ForbiddenException, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('User is not authenticated');
        }

        try {
            const decoded = this.jwtService.verify(token);
            console.log('Decoded Token:', decoded); 

            const user = await this.userRepository.findOne({ where: { id: decoded.sid } });
            console.log('User:', user);

            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            if (user.role === 'User') {
                throw new ForbiddenException('You do not have permission');
            }

            req.user = user; 
            next(); 
        } catch (err) {
            console.error('Error:', err.message); 
            if (err instanceof ForbiddenException || err instanceof UnauthorizedException) {
                throw err; 
            }
            throw new UnauthorizedException('Invalid token'); 
        }
    }
}
