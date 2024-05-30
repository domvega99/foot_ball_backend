import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadSingleFile(@UploadedFile() file) {
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    // const filePath = path.join(__dirname, '..', 'uploads', uniqueFileName);
    const filePath = path.join('src/uploads', uniqueFileName);
    fs.writeFileSync(filePath, file.buffer);
    return { filename: uniqueFileName };
  }

  @Post('images')
  @UseInterceptors(FilesInterceptor('images'))
  async uploadMultipleFiles(@UploadedFiles() files) {
    const fileNames = [];
    for (const file of files) {
      const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
      // const filePath = path.join(__dirname, '..', 'uploads', uniqueFileName);
      const filePath = path.join('src/uploads', uniqueFileName);
      fs.writeFileSync(filePath, file.buffer);
      fileNames.push(uniqueFileName);
    }
    return { filenames: fileNames };
  }

  @Post()
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pagesService.update(+id, updatePageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(+id);
  }
}
