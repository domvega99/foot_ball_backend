import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
      .exclude(
        { path: 'football/leagues/website/leagues', method: RequestMethod.GET },
        { path: 'football/leagues/website/league-teams', method: RequestMethod.GET },
        { path: 'football/leagues/website/league-match', method: RequestMethod.GET },
      )
      .forRoutes(LeaguesController);

    consumer
      .apply(AuthMiddleware, AdminRoleMiddleware)
      .exclude(
        { path: 'football/leagues/website/leagues', method: RequestMethod.GET },
        { path: 'football/leagues/website/league-teams', method: RequestMethod.GET },
        { path: 'football/leagues/website/league-match', method: RequestMethod.GET },
      )
      .forRoutes(LeaguesController);
  }
}
