import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamAboutService } from './team_about.service';
import { CreateTeamAboutDto } from './dto/create-team_about.dto';
import { UpdateTeamAboutDto } from './dto/update-team_about.dto';
import { TeamAbout } from './entities/team_about.entity';

@Controller('football/team-about')
export class TeamAboutController {
  constructor(private readonly teamAboutService: TeamAboutService) {}

  @Post()
  async create(@Body() data: Partial<TeamAbout>): Promise<TeamAbout> {
    return this.teamAboutService.create(data);
  }

  @Get()
  async findAll(): Promise<TeamAbout[]> {
    return this.teamAboutService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<TeamAbout> {
    return this.teamAboutService.findById(parseInt(id, 10));
  }

  @Get('team/:teamId')
  async findByTeamId(@Param('teamId') id: string): Promise<TeamAbout> {
    return this.teamAboutService.findByTeamId(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() teamData: Partial<TeamAbout>,
  ): Promise<TeamAbout> {
    return this.teamAboutService.update(parseInt(id, 10), teamData);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.teamAboutService.remove(+id);
  }

}
