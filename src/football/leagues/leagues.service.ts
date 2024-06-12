import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeaguesService {
  constructor(
    @InjectRepository(League)
    private leagueRepository: Repository<League>,
  ) {}

  async create(leagueData: Partial<League>): Promise<League> {
    const league = this.leagueRepository.create(leagueData);
    return this.leagueRepository.save(league);
  }

  async findAll(): Promise<League[]> {
    return this.leagueRepository.find();
  }

  async findById(id: number): Promise<League> {
    const league = await this.leagueRepository.findOne({ where: { id: id } });
    if (!league) {
      throw new NotFoundException('Team not found');
    }
    return league;
  }

  async update(id: number, leagueData: Partial<League>): Promise<League> {
    const league = await this.findById(id);
    return this.leagueRepository.save({ ...league, ...leagueData });
  }

  async remove(id: number): Promise<void> {
    const league = await this.findById(id);
    await this.leagueRepository.remove(league);
  }
}
