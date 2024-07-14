import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TeamAboutService } from './team_about.service';
import { TeamAboutController } from './team_about.controller';
import { TeamAbout } from './entities/team_about.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { TeamRoleMiddleware } from 'src/middleware/team.role.middleware';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamAbout, User]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [TeamAboutController],
  providers: [TeamAboutService],
})
export class TeamAboutModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'football/team-about/team/:teamId', method: RequestMethod.GET },
      )
      .forRoutes(TeamAboutController);

    consumer
      .apply(AuthMiddleware, TeamRoleMiddleware)
      .exclude(
        { path: 'football/team-about/team/:teamId', method: RequestMethod.GET },
      )
      .forRoutes(TeamAboutController);
  }
}
