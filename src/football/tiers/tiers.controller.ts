import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiersService } from './tiers.service';
import { CreateTierDto } from './dto/create-tier.dto';
import { UpdateTierDto } from './dto/update-tier.dto';
import { Tier } from './entities/tier.entity';

@Controller('football/tiers')
export class TiersController {
  constructor(private readonly tiersService: TiersService) {}

  @Post()
  async create(@Body() data: Partial<Tier>): Promise<Tier> {
    return this.tiersService.create(data);
  }

  @Get()
  async findAll(): Promise<Tier[]> {
    return this.tiersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Tier> {
    return this.tiersService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Tier>,
  ): Promise<Tier> {
    return this.tiersService.update(id, data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.tiersService.remove(+id);
  }
}
