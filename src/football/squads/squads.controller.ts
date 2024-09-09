import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SquadsService } from './squads.service';
import { CreateSquadDto } from './dto/create-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';
import { Squad } from './entities/squad.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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

  @Get('team/:teamId')
  async findByTeamId(@Param('teamId') teamId: number): Promise<Squad[]> {
    return this.squadsService.findByTeamId(teamId);
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/squad',
      filename: (req, file, callback) => {
        const originalName = file.originalname;
        return callback(null, originalName);
      },
    }),
  }))
  async uploadImage(@UploadedFile() file) {
    return { imagePath: file.path };
  }
}
