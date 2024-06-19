import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async create(data: Partial<News>): Promise<News> {
    const result = this.newsRepository.create(data);
    return this.newsRepository.save(result);
  }

  async findAll(): Promise<News[]> {
    return this.newsRepository.find();
  }

  async findById(id: number): Promise<News> {
    const result = await this.newsRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('News not found');
    }
    return result;
  }

  async update(id: number, data: Partial<News>): Promise<News> {
    const result = await this.findById(id);
    return this.newsRepository.save({ ...result, ...data });
  }

  async remove(id: number): Promise<void> {
    const result = await this.findById(id);
    await this.newsRepository.remove(result);
  }
}
