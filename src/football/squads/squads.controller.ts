import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SquadsService } from './squads.service';
import { CreateSquadDto } from './dto/create-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';
import { Squad } from './entities/squad.entity';

@Controller('football/squads')
export class SquadsController {
  constructor(private readonly squadsService: SquadsService) {}
  
  @Post()
  async create(@Body() data: Partial<Squad>): Promise<Squad> {
    return this.squadsService.create(data);
  }

  @Get()
  async findAll(): Promise<Squad[]> {
    return this.squadsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Squad> {
    return this.squadsService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Squad>,
  ): Promise<Squad> {
    return this.squadsService.update(parseInt(id, 10), data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.squadsService.remove(+id);
  }
}
