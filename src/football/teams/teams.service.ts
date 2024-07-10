import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { Squad } from '../squads/entities/squad.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(Squad)
    private squadRepository: Repository<Squad>
  ) {}

  async create(teamData: Partial<Team>): Promise<Team> {
    const team = this.teamRepository.create(teamData);
    return this.teamRepository.save(team);
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  async findById(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({ where: { id: id } });
    if (!team) {
      throw new NotFoundException('Team not found');
    }
    return team;
  }

  async update(id: number, teamData: Partial<Team>): Promise<Team> {
    const team = await this.findById(id);
    return this.teamRepository.save({ ...team, ...teamData });
  }

  async remove(id: number): Promise<void> {
    const team = await this.findById(id);
    await this.teamRepository.remove(team);
  }

  async findAllActiveTeamSquad(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) {
        throw new NotFoundException('Team not found');
    }
    const squad = await this.squadRepository.find({ where: { team_id: id } });
    (team as any).squad = squad;

    return team;
}
}
