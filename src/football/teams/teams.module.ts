import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { AdminRoleMiddleware } from 'src/middleware/admin.role.middleware';
import { User } from 'src/users/entities/user.entity';
import { TeamRoleMiddleware } from 'src/middleware/team.role.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, User]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'football/teams', method: RequestMethod.GET },
      )
      .forRoutes(TeamsController);

    consumer
      .apply(AuthMiddleware, TeamRoleMiddleware)
      .exclude(
        { path: 'football/teams', method: RequestMethod.GET },
      )
      .forRoutes(TeamsController);
  }
}
