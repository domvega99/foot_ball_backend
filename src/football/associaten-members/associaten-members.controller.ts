import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssociatenMembersService } from './associaten-members.service';
import { CreateAssociatenMemberDto } from './dto/create-associaten-member.dto';
import { UpdateAssociatenMemberDto } from './dto/update-associaten-member.dto';
import { AssociatenMember } from './entities/associaten-member.entity';

@Controller('football/associaten-members')
export class AssociatenMembersController {
  constructor(private readonly associatenMembersService: AssociatenMembersService) {}

  @Post()
  async create(@Body() data: Partial<AssociatenMember>): Promise<AssociatenMember> {
    return this.associatenMembersService.create(data);
  }

  @Get()
  async findAll(): Promise<AssociatenMember[]> {
    return this.associatenMembersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<AssociatenMember> {
    return this.associatenMembersService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<AssociatenMember>,
  ): Promise<AssociatenMember> {
    return this.associatenMembersService.update(id, data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.associatenMembersService.remove(+id);
  }
}
