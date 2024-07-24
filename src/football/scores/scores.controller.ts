import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { Score } from './entities/score.entity';

@Controller('football/scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}
  
  @Post()
  async create(@Body() data: Partial<Score>): Promise<Score> {
    return this.scoresService.create(data);
  }

  @Get()
  async findAll(): Promise<Score[]> {
    return this.scoresService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Score> {
    return this.scoresService.findById(parseInt(id, 10));
  }

  @Patch(':id/league/:leagueId')
  async update(
      @Param('id') id: string,
      @Param('leagueId') leagueId: string,
      @Body() data: Partial<Score>,
  ): Promise<Score> {
      return this.scoresService.update(parseInt(id, 10), data, parseInt(leagueId, 10));
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.scoresService.remove(+id);
  }

  // @Put(':id')
  // async updateScore(
  //     @Param('id') id: number,
  //     @Body('result') result: string,
  // ): Promise<Score> {
  //     return this.scoresService.updateScore(id, result);
  // }
}
