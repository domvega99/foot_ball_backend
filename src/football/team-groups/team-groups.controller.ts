import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamGroupsService } from './team-groups.service';
import { CreateTeamGroupDto } from './dto/create-team-group.dto';
import { UpdateTeamGroupDto } from './dto/update-team-group.dto';
import { TeamGroup } from './entities/team-group.entity';

@Controller('football/team-groups')
export class TeamGroupsController {
  constructor(private readonly teamGroupsService: TeamGroupsService) {}

  @Post()
  async create(@Body() data: Partial<TeamGroup>): Promise<TeamGroup> {
    return this.teamGroupsService.create(data);
  }

  @Get()
  async findAll(): Promise<TeamGroup[]> {
    return this.teamGroupsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<TeamGroup> {
    return this.teamGroupsService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<TeamGroup>,
  ): Promise<TeamGroup> {
    return this.teamGroupsService.update(id, data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.teamGroupsService.remove(+id);
  }
}
