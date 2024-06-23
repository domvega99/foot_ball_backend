import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { League } from './entities/league.entity';

@Controller('football/leagues')
export class LeaguesController {
  constructor(private readonly leagueService: LeaguesService) {}
  
  @Post()
  async create(@Body() leagueData: Partial<League>): Promise<League> {
    return this.leagueService.create(leagueData);
  }

  @Get()
  async findAll(): Promise<League[]> {
    return this.leagueService.findAll();
  }

  @Get('/website/leagues')
  async getAllPostedLeagues() {
    return await this.leagueService.findAllPostedLeague();
  }

  @Get('/website/league-teams')
  async getAllLeaguesWithTeams() {
    return await this.leagueService.findAllLeaguesWithTeams();
  }

  @Get('website/league-match')
  async getPostedLeaguesWithPostedMatches(): Promise<League[]> {
    return this.leagueService.getPostedLeaguesWithPostedMatches();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<League> {
    return this.leagueService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() leagueData: Partial<League>,
  ): Promise<League> {
    return this.leagueService.update(parseInt(id, 10), leagueData);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.leagueService.remove(+id);
  }
}
