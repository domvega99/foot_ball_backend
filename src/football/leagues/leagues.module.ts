import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { AdminRoleMiddleware } from 'src/middleware/admin.role.middleware';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([League, User]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [LeaguesController],
  providers: [LeaguesService],
})
export class LeaguesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(LeaguesController);

    consumer
      .apply(AuthMiddleware, AdminRoleMiddleware)
      .forRoutes(LeaguesController);
  }
}
