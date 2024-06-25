import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LeagueTeamsService } from './league_teams.service';
import { LeagueTeamsController } from './league_teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueTeam } from './entities/league_team.entity';
import { Team } from '../teams/entities/team.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { AdminRoleMiddleware } from 'src/middleware/admin.role.middleware';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeagueTeam, Team, User]),
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [LeagueTeamsController],
  providers: [LeagueTeamsService],
})
export class LeagueTeamsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(LeagueTeamsController);

    consumer
      .apply(AuthMiddleware, AdminRoleMiddleware)
      .forRoutes(LeagueTeamsController);
  }
}
