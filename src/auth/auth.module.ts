import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { SessionSerializer } from './utils/Serializer';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { FacebookStrategy } from './utils/FacebookStrategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your-secret-key', 
      signOptions: { expiresIn: '1h' }, 
    }),
    PassportModule.register({ defaultStrategy: 'facebook' }),
    ConfigModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, SessionSerializer, FacebookStrategy,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    }
  ],
})
export class AuthModule {}
