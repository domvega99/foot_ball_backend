import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { Coach } from './entities/coach.entity';

@Controller('football/coaches')
export class CoachesController {
  constructor(private readonly coachesService: CoachesService) {}

  @Post()
  async create(@Body() data: Partial<Coach>): Promise<Coach> {
    return this.coachesService.create(data);
  }

  @Get()
  async findAll(): Promise<Coach[]> {
    return this.coachesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Coach> {
    return this.coachesService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Coach>,
  ): Promise<Coach> {
    return this.coachesService.update(id, data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.coachesService.remove(+id);
  }
}
