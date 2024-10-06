import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTierDto } from './dto/create-tier.dto';
import { UpdateTierDto } from './dto/update-tier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tier } from './entities/tier.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiersService {
  constructor(
    @InjectRepository(Tier)
    private tierRepository: Repository<Tier>,
  ) {}

  async create(data: Partial<Tier>): Promise<Tier> {
    const result = this.tierRepository.create(data);
    return this.tierRepository.save(result);
  }

  async findAll(): Promise<Tier[]> {
    return this.tierRepository.find();
  }

  async findById(id: number): Promise<Tier> {
    const result = await this.tierRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Tier not found');
    }
    return result;
  }

  async update(id: number, data: Partial<Tier>): Promise<Tier> {
    const result = await this.findById(id);
    return this.tierRepository.save({ ...result, ...data });
  }

  async remove(id: number): Promise<void> {
    const result = await this.findById(id);
    await this.tierRepository.remove(result);
  }
}
