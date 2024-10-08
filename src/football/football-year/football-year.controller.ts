import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FootballYearService } from './football-year.service';
import { CreateFootballYearDto } from './dto/create-football-year.dto';
import { UpdateFootballYearDto } from './dto/update-football-year.dto';
import { FootballYear } from './entities/football-year.entity';

@Controller('football/football-year')
export class FootballYearController {
  constructor(private readonly footballYearService: FootballYearService) {}

  @Post()
  async create(@Body() data: Partial<FootballYear>): Promise<FootballYear> {
    return this.footballYearService.create(data);
  }

  @Get()
  async findAll(): Promise<FootballYear[]> {
    return this.footballYearService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<FootballYear> {
    return this.footballYearService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<FootballYear>,
  ): Promise<FootballYear> {
    return this.footballYearService.update(id, data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.footballYearService.remove(+id);
  }
}
