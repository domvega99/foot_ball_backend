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

  async findAllPublishedNews(): Promise<Content[]> {
    return this.contentRepository.find({ where: { status: 'Published', stat: 1, block: 'News' } });
  }

  async findAllPublishedFeatures(): Promise<Content[]> {
    return this.contentRepository.find({ where: { status: 'Published', stat: 1, block: 'Feature' } });
  }

  async findAllPublishedClubs(): Promise<Content[]> {
    return this.contentRepository.find({ where: { status: 'Published', stat: 1, block: 'Club' } });
  }

  async findAllPublishedContent(): Promise<any> {
    const contents = await this.contentRepository.createQueryBuilder('content')
      .where('content.status = :status', { status: 'Published' })
      .andWhere('content.stat = :stat', { stat: 1 })
      .orderBy('content.created_on', 'DESC')
      .getMany();

    const groupedContents = contents.reduce((acc, content) => {
      if (!acc[content.block]) {
        acc[content.block] = [];
      }
      acc[content.block].push(content);
      return acc;
    }, {});

    return groupedContents;
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
