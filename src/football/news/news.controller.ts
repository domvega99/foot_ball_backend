import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@Controller('football/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  
  @Post()
  async create(@Body() data: Partial<News>): Promise<News> {
    return this.newsService.create(data);
  }

  @Get()
  async findAll(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<News> {
    return this.newsService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<News>,
  ): Promise<News> {
    return this.newsService.update(parseInt(id, 10), data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.newsService.remove(+id);
  }
}
