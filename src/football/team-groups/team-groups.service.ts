import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamGroupDto } from './dto/create-team-group.dto';
import { UpdateTeamGroupDto } from './dto/update-team-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamGroup } from './entities/team-group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamGroupsService {
  constructor(
    @InjectRepository(TeamGroup)
    private teamGroupRepository: Repository<TeamGroup>,
  ) {}

  async create(data: Partial<TeamGroup>): Promise<TeamGroup> {
    const result = this.teamGroupRepository.create(data);
    return this.teamGroupRepository.save(result);
  }

  async findAll(): Promise<TeamGroup[]> {
    return this.teamGroupRepository.find();
  }

  async findById(id: number): Promise<TeamGroup> {
    const result = await this.teamGroupRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Team group not found');
    }
    return result;
  }

  async update(id: number, data: Partial<TeamGroup>): Promise<TeamGroup> {
    const result = await this.findById(id);
    return this.teamGroupRepository.save({ ...result, ...data });
  }

  async remove(id: number): Promise<void> {
    const result = await this.findById(id);
    await this.teamGroupRepository.remove(result);
  }
}
