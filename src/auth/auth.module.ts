import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { SessionSerializer } from './utils/Serializer';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Provide UserRepository
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Optional: Set token expiration time
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    }
  ],
})
export class AuthModule {}
