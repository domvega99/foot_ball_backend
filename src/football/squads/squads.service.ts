import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Squad } from './entities/squad.entity';

@Injectable()
export class SquadsService {
  constructor(
    @InjectRepository(Squad)
    private squadRepository: Repository<Squad>,
  ) {}

  async create(data: Partial<Squad>): Promise<Squad> {
    const squad = this.squadRepository.create(data);
    return this.squadRepository.save(squad);
  }

  async findAll(): Promise<Squad[]> {
    return this.squadRepository.find();
  }

  async findById(id: number): Promise<Squad> {
    const squad = await this.squadRepository.findOne({ where: { id: id } });
    if (!squad) {
      throw new NotFoundException('Squad not found');
    }
    return squad;
  }

  async findByTeamId(teamId: number): Promise<Squad[]> {
    return this.squadRepository.find({ where: { team_id: teamId } });
  }

  async update(id: number, data: Partial<Squad>): Promise<Squad> {
    const squad = await this.findById(id);
    return this.squadRepository.save({ ...squad, ...data });
  }

  async remove(id: number): Promise<void> {
    const squad = await this.findById(id);
    await this.squadRepository.remove(squad);
  }
}
