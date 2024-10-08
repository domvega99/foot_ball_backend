import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('football/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}
  
  @Post()
  async create(@Body() data: Partial<Content>): Promise<Content> {
    return this.contentService.create(data);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/content',
      filename: (req, file, callback) => {
        const originalName = file.originalname;
        return callback(null, originalName);
      },
    }),
  }))
  async uploadImage(@UploadedFile() file) {
    return { imagePath: file.path };
  }

  @Get('/website/news')
  async findAllPublishedNews(): Promise<Content[]> {
    return this.contentService.findAllPublishedNews();
  }

  @Get('/website/features')
  async findAllPublishedFeatures(): Promise<Content[]> {
    return this.contentService.findAllPublishedFeatures();
  }

  @Get('/website/clubs')
  async findAllPublishedClubs(): Promise<Content[]> {
    return this.contentService.findAllPublishedClubs();
  }

  @Get('/website/clubs/:teamId')
  async getContentByTeamId(@Param('teamId') teamId: string): Promise<Content[]> {
    return this.contentService.getContentByTeamId(parseInt(teamId, 10));
  }

  @Get('/website/contents')
  async findAllPublishedContent(): Promise<Content[]> {
    return this.contentService.findAllPublishedContent();
  }

  @Get()
  async findAll(): Promise<Content[]> {
    return this.contentService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Content> {
    return this.contentService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Content>,
  ): Promise<Content> {
    return this.contentService.update(parseInt(id, 10), data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.contentService.remove(+id);
  }
}
