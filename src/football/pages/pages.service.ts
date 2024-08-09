import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private pageRepository: Repository<Page>,
  ) {}

  async create(data: Partial<Page>): Promise<Page> {
    const squad = this.pageRepository.create(data);
    return this.pageRepository.save(squad);
  }

  async findAll(): Promise<Page[]> {
    return this.pageRepository.find();
  }

  async findById(id: number): Promise<Page> {
    const squad = await this.pageRepository.findOne({ where: { id: id } });
    if (!squad) {
      throw new NotFoundException('Page not found');
    }
    return squad;
  }

  async update(id: number, data: Partial<Page>): Promise<Page> {
    const squad = await this.findById(id);
    return this.pageRepository.save({ ...squad, ...data });
  }

  async remove(id: number): Promise<void> {
    const squad = await this.findById(id);
    await this.pageRepository.remove(squad);
  }

  async findPagebySlug(slug: string): Promise<Page> {
    const page = await this.pageRepository.findOne({ where: { slug: slug }})
    if (!page) {
        throw new NotFoundException('Page not found');
    }
    return page;
  }
}
