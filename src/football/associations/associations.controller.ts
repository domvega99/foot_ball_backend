import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { Association } from './entities/association.entity';

@Controller('football/associations')
export class AssociationsController {
  constructor(private readonly associationsService: AssociationsService) {}

  @Post()
  async create(@Body() data: Partial<Association>): Promise<Association> {
    return this.associationsService.create(data);
  }

  @Get()
  async findAll(): Promise<Association[]> {
    return this.associationsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Association> {
    return this.associationsService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Association>,
  ): Promise<Association> {
    return this.associationsService.update(id, data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.associationsService.remove(+id);
  }
}
