import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { SessionSerializer } from './utils/Serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
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
