import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    const existingTeam = await this.teamRepository.findOne({ where: { team: teamData.team } });
    const existingSlug = await this.teamRepository.findOne({ where: { slug: teamData.slug } });

    if (existingTeam) {
      throw new ConflictException('Team name already exists');
    } else if (existingSlug) {
      throw new ConflictException('Slug name already exists');
    }

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
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    if (teamData.team && teamData.team !== team.team) {
      const existingTeam = await this.teamRepository.findOne({ where: { team: teamData.team } });
      if (existingTeam && existingTeam.id !== id) {
        throw new ConflictException('Team name already exists');
      }
    }

    if (teamData.slug && teamData.slug !== team.slug) {
      const existingSlug = await this.teamRepository.findOne({ where: { slug: teamData.slug } });
      if (existingSlug && existingSlug.id !== id) {
        throw new ConflictException('Slug name already exists');
      }
    }

    Object.assign(team, teamData);
    return this.teamRepository.save(team);
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

  async findAllTeamFixtures(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) {
        throw new NotFoundException('Team not found');
    }

    return team;
  }

  async findTeambySlug(slug: string): Promise<Team> {
    const team = await this.teamRepository.findOne({ where: { slug: slug }})
    if (!team) {
        throw new NotFoundException('Team not found');
    }

    return team;
  }
}
