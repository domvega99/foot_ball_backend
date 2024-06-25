import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';

@Controller('football/matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}
  
  @Post()
  async create(@Body() data: Partial<Match>): Promise<Match> {
    return this.matchesService.create(data);
  }

  @Get(':leagueId')
  async findAll(@Param('leagueId') leagueId: number): Promise<Match[]> {
    return this.matchesService.findAll(leagueId);
  }
  // @Get()
  // async findAll(): Promise<Match[]> {
  //   return this.matchesService.findAll();
  // }

  // @Get(':id')
  // async findById(@Param('id') id: string): Promise<Match> {
  //   return this.matchesService.findById(parseInt(id, 10));
  // }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Match>,
  ): Promise<Match> {
    return this.matchesService.update(parseInt(id, 10), data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.matchesService.remove(+id);
  }
}
