import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coach } from './entities/coach.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoachesService {
  constructor(
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
  ) {}

  async create(data: Partial<Coach>): Promise<Coach> {
    const result = this.coachRepository.create(data);
    return this.coachRepository.save(result);
  }

  async findAll(): Promise<Coach[]> {
    return this.coachRepository.find();
  }

  async findById(id: number): Promise<Coach> {
    const result = await this.coachRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Coach not found');
    }
    return result;
  }

  async update(id: number, data: Partial<Coach>): Promise<Coach> {
    const result = await this.findById(id);
    return this.coachRepository.save({ ...result, ...data });
  }

  async remove(id: number): Promise<void> {
    const result = await this.findById(id);
    await this.coachRepository.remove(result);
  }

}
