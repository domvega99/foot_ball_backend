import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayerScoreService } from './player_score.service';
import { CreatePlayerScoreDto } from './dto/create-player_score.dto';
import { UpdatePlayerScoreDto } from './dto/update-player_score.dto';
import { PlayerScore } from './entities/player_score.entity';

@Controller('football/player-scores')
export class PlayerScoreController {
  constructor(private readonly playerScoreService: PlayerScoreService) {}
  
  @Post()
  async create(@Body() data: Partial<PlayerScore>): Promise<PlayerScore> {
    return this.playerScoreService.create(data);
  }

  @Get()
  async findAll(): Promise<PlayerScore[]> {
    return this.playerScoreService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<PlayerScore> {
    return this.playerScoreService.findById(parseInt(id, 10));
  }

  @Get('team/:teamId/match/:matchId')
  async findByTeamAndMatch(
    @Param('teamId') teamId: number,
    @Param('matchId') matchId: number,
  ): Promise<PlayerScore[]> {
    return this.playerScoreService.findByTeamId(teamId, matchId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<PlayerScore>,
  ): Promise<PlayerScore> {
    return this.playerScoreService.update(parseInt(id, 10), data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.playerScoreService.remove(+id);
  }
}
