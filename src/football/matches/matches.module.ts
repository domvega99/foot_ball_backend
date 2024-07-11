import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { AdminRoleMiddleware } from 'src/middleware/admin.role.middleware';
import { User } from 'src/users/entities/user.entity';
import { Score } from '../scores/entities/score.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, User, Score]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'football/matches', method: RequestMethod.GET },
        { path: 'football/matches/league/:leagueId/team/:teamId/scores', method: RequestMethod.GET },
      )
      .forRoutes(MatchesController);

    consumer
      .apply(AuthMiddleware, AdminRoleMiddleware)
      .exclude(
        { path: 'football/matches', method: RequestMethod.GET },
        { path: 'football/matches/league/:leagueId/team/:teamId/scores', method: RequestMethod.GET },
      )
      .forRoutes(MatchesController);
  }
}
