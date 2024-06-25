import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeagueTeamsService } from './league_teams.service';
import { CreateLeagueTeamDto } from './dto/create-league_team.dto';
import { UpdateLeagueTeamDto } from './dto/update-league_team.dto';
import { LeagueTeam } from './entities/league_team.entity';

@Controller('football/league-teams')
export class LeagueTeamsController {
  constructor(private readonly leagueTeamService: LeagueTeamsService) {}
  
  @Post()
  async create(@Body() data: Partial<LeagueTeam>[]): Promise<LeagueTeam[]> {
    return this.leagueTeamService.createBulk(data);
  }

  @Get(':leagueId')
  async findAll(@Param('leagueId') leagueId: number): Promise<LeagueTeam[]> {
    return this.leagueTeamService.findAll(leagueId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<LeagueTeam>,
  ): Promise<LeagueTeam> {
    return this.leagueTeamService.update(parseInt(id, 10), data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.leagueTeamService.remove(+id);
  }
}
