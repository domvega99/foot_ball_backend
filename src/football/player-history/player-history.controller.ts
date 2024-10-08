import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayerHistoryService } from './player-history.service';
import { CreatePlayerHistoryDto } from './dto/create-player-history.dto';
import { UpdatePlayerHistoryDto } from './dto/update-player-history.dto';
import { PlayerHistory } from './entities/player-history.entity';

@Controller('football/player-history')
export class PlayerHistoryController {
  constructor(private readonly playerHistoryService: PlayerHistoryService) {}

  @Post()
  async create(@Body() data: Partial<PlayerHistory>): Promise<PlayerHistory> {
    return this.playerHistoryService.create(data);
  }

  @Get()
  async findAll(): Promise<PlayerHistory[]> {
    return this.playerHistoryService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<PlayerHistory> {
    return this.playerHistoryService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<PlayerHistory>,
  ): Promise<PlayerHistory> {
    return this.playerHistoryService.update(id, data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.playerHistoryService.remove(+id);
  }
}
