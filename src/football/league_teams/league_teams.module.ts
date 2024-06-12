import { Module } from '@nestjs/common';
import { LeagueTeamsService } from './league_teams.service';
import { LeagueTeamsController } from './league_teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueTeam } from './entities/league_team.entity';
import { Team } from '../teams/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeagueTeam, Team])],
  controllers: [LeagueTeamsController],
  providers: [LeagueTeamsService],
})
export class LeagueTeamsModule {}
