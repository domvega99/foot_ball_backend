import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { Gallery } from './entities/gallery.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('football/gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('images', 10, {
    storage: diskStorage({
      destination: './uploads/gallery',
      filename: (req, file, callback) => {
        const originalName = file.originalname;
        return callback(null, originalName);
      },
    }),
  }))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[], @Body('team_id') teamId: number) {
    const imageEntries = files.map(file => ({
      file_name: file.originalname,  
      team_id: teamId,
    }));

    await this.galleryService.createMany(imageEntries);
    const imagePaths = files.map(file => ({
      file_name: file.originalname,  
    }));

    return { imagePaths };
  }

  @Get('/team/:teamId')
  async getGalleryByTeamId(@Param('teamId') teamId: string): Promise<Gallery[]> {
    return this.galleryService.getGalleryByTeamId(parseInt(teamId, 10));
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.galleryService.remove(+id);
  }
}
