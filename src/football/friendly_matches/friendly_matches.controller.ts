import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendlyMatchesService } from './friendly_matches.service';
import { CreateFriendlyMatchDto } from './dto/create-friendly_match.dto';
import { UpdateFriendlyMatchDto } from './dto/update-friendly_match.dto';
import { FriendlyMatch } from './entities/friendly_match.entity';

@Controller('football/friendly-matches')
export class FriendlyMatchesController {
  constructor(private readonly friendlyMatchesService: FriendlyMatchesService) {}

  @Post()
  async create(@Body() data: Partial<FriendlyMatch>): Promise<FriendlyMatch> {
    return this.friendlyMatchesService.create(data);
  }

  @Get()
  async findAll(): Promise<FriendlyMatch[]> {
    return this.friendlyMatchesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<FriendlyMatch> {
    return this.friendlyMatchesService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<FriendlyMatch>,
  ): Promise<FriendlyMatch> {
    return this.friendlyMatchesService.update(id, data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.friendlyMatchesService.remove(+id);
  }

  @Get('league/:leagueId')
  async findAllByLeagueId(@Param('leagueId') leagueId: number): Promise<FriendlyMatch[]> {
    return this.friendlyMatchesService.findAllByLeagueId(leagueId);
  }
}
