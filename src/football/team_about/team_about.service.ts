import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamAboutDto } from './dto/create-team_about.dto';
import { UpdateTeamAboutDto } from './dto/update-team_about.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamAbout } from './entities/team_about.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamAboutService {
  constructor(
    @InjectRepository(TeamAbout)
    private teamAboutRepository: Repository<TeamAbout>,
  ) {}

  async create(data: Partial<TeamAbout>): Promise<TeamAbout> {
    const result = this.teamAboutRepository.create(data);
    return this.teamAboutRepository.save(result);
  }

  async findAll(): Promise<TeamAbout[]> {
    return this.teamAboutRepository.find();
  }

  async findByTeamId(teamId: number): Promise<TeamAbout> {
    const result = await this.teamAboutRepository.findOne({ where: { team_id: teamId } });
    if (!result) {
      throw new NotFoundException('Team about not found');
    }
    return result;
  }

  async findById(id: number): Promise<TeamAbout> {
    const result = await this.teamAboutRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Team about not found');
    }
    return result;
  }

  async update(id: number, data: Partial<TeamAbout>): Promise<TeamAbout> {
    const result = await this.findById(id);
    return this.teamAboutRepository.save({ ...result, ...data });
  }

  async remove(id: number): Promise<void> {
    const result = await this.findById(id);
    await this.teamAboutRepository.remove(result);
  }
}
