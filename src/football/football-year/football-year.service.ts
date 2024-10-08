import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFootballYearDto } from './dto/create-football-year.dto';
import { UpdateFootballYearDto } from './dto/update-football-year.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FootballYear } from './entities/football-year.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FootballYearService {
  constructor(
    @InjectRepository(FootballYear)
    private footballYearRepository: Repository<FootballYear>,
  ) {}

  async create(data: Partial<FootballYear>): Promise<FootballYear> {
    const result = this.footballYearRepository.create(data);
    return this.footballYearRepository.save(result);
  }

  async findAll(): Promise<FootballYear[]> {
    return this.footballYearRepository.find();
  }

  async findById(id: number): Promise<FootballYear> {
    const result = await this.footballYearRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Associaten member not found');
    }
    return result;
  }

  async update(id: number, data: Partial<FootballYear>): Promise<FootballYear> {
    const result = await this.findById(id);
    return this.footballYearRepository.save({ ...result, ...data });
  }

  async remove(id: number): Promise<void> {
    const result = await this.findById(id);
    await this.footballYearRepository.remove(result);
  }
}
