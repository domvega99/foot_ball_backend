import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';

@Controller('football/pages')
export class PagesController {
  constructor(private readonly pageService: PagesService) {}
  
  @Post()
  async create(@Body() data: Partial<Page>): Promise<Page> {
    return this.pageService.create(data);
  }

  @Get()
  async findAll(): Promise<Page[]> {
    return this.pageService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Page> {
    return this.pageService.findById(parseInt(id, 10));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<Page>,
  ): Promise<Page> {
    return this.pageService.update(parseInt(id, 10), data);
  }
  
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.pageService.remove(+id);
  }

  @Get('slug/:params')
  async findTeambySlug(@Param('params') slug: string) {
    return this.pageService.findPagebySlug(slug);
  }
}
