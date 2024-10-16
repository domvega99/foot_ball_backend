import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';

@Controller('football/clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  async create(@Body() data: Partial<Club>): Promise<Club> {
    return this.clubsService.create(data);
  }

  @Get()
  async findAll(): Promise<Club[]> {
    return this.clubsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Club> {
    return this.clubsService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Club>,
  ): Promise<Club> {
    return this.clubsService.update(id, data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.clubsService.remove(+id);
  }
}
