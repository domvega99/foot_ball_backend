import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entities/gallery.entity';

@Injectable()
export class GalleryService {
    constructor(
      @InjectRepository(Gallery)
      private galleryRepository: Repository<Gallery>,
    ) {}

    async create(data: Partial<Gallery>): Promise<Gallery> {
      const gallery = this.galleryRepository.create(data);
      return this.galleryRepository.save(gallery);
    }

    async createMany(images: Partial<Gallery>[]): Promise<Gallery[]> {
      return this.galleryRepository.save(images);
    }

    async getGalleryByTeamId(teamId: number): Promise<Gallery[]> {
      const result = await this.galleryRepository.find({
        where: { team_id: teamId },
        order: { id: 'DESC' },
      });
      return result;
    }

    async findById(id: number): Promise<Gallery> {
      const result = await this.galleryRepository.findOne({ where: { id: id } });
      if (!result) {
        throw new NotFoundException('Content not found');
      }
      return result;
    }

    async remove(id: number): Promise<void> {
      const result = await this.findById(id);
      await this.galleryRepository.remove(result);
    }
}
