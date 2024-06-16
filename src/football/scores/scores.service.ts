import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
  ) {}

  async create(data: Partial<Score>): Promise<Score> {
    const result = this.scoreRepository.create(data);
    return this.scoreRepository.save(result);
  }

  async findAll(): Promise<Score[]> {
    return this.scoreRepository.find();
  }

  async findById(id: number): Promise<Score> {
    const result = await this.scoreRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Score not found');
    }
    return result;
  }

  async update(id: number, data: Partial<Score>): Promise<Score> {
    const result = await this.findById(id);
    return this.scoreRepository.save({ ...result, ...data });
  }

  async remove(id: number): Promise<void> {
    const team = await this.findById(id);
    await this.scoreRepository.remove(team);
  }
}
