import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async create(data: Partial<Content>): Promise<Content> {
    const result = this.contentRepository.create(data);
    return this.contentRepository.save(result);
  }

  async findAll(): Promise<Content[]> {
    return this.contentRepository.find();
  }

  async findById(id: number): Promise<Content> {
    const result = await this.contentRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Content not found');
    }
    return result;
  }

  async update(id: number, data: Partial<Content>): Promise<Content> {
    const result = await this.findById(id);
    return this.contentRepository.save({ ...result, ...data });
  }

  async remove(id: number): Promise<void> {
    const result = await this.findById(id);
    await this.contentRepository.remove(result);
  }
}
