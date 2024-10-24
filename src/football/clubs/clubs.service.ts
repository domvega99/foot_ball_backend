import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from './entities/club.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {}

  async create(data: Partial<Club>): Promise<Club> {
    const existingClubName = await this.clubRepository.findOne({ where: { name: data.name } });
    const existingSlug = await this.clubRepository.findOne({ where: { slug: data.slug } });

    if (existingClubName) {
      throw new ConflictException('Club name already exists');
    } else if (existingSlug) {
      throw new ConflictException('Slug name already exists');
    }
    
    const result = this.clubRepository.create(data);
    return this.clubRepository.save(result);
  }

  async findAll(): Promise<Club[]> {
    return this.clubRepository.find();
  }

  async findById(id: number): Promise<Club> {
    const result = await this.clubRepository.findOne({ where: { id: id }});
    if (!result) {
      throw new NotFoundException('Club not found');
    }
    return result;
  }

  async update(id: number, data: Partial<Club>): Promise<Club> {
    const result = await this.findById(id);

    if (!result) {
      throw new NotFoundException('Club not found');
    }

    if (data.name && data.name !== result.name) {
      const existingClubName = await this.clubRepository.findOne({ where: { name: data.name } });
      if (existingClubName && existingClubName.id !== id) {
        throw new ConflictException('Club name already exists');
      }
    }

    if (data.slug && data.slug !== result.slug) {
      const existingSlug = await this.clubRepository.findOne({ where: { slug: data.slug } });
      if (existingSlug && existingSlug.id !== id) {
        throw new ConflictException('Slug name already exists');
      }
    }

    Object.assign(result, data);
    return this.clubRepository.save(result);
  }

  async remove(id: number): Promise<void> {
    const result = await this.findById(id);
    await this.clubRepository.remove(result);
  }
}
