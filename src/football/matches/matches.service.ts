import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { Team } from '../teams/entities/team.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
  ) {}

  async create(data: Partial<Match>): Promise<Match> {
    data.status = 'Draft';
    const result = this.matchRepository.create(data);
    return this.matchRepository.save(result);
  }

  async findAll(leagueId: number): Promise<Match[]> {
    return this.matchRepository.find({ 
      where: { stat: 1, league_id: leagueId }, 
      relations: ['scores', 'scores.team'],
      order: { match_date: 'DESC', match_time: 'ASC' }
    });
  }

  async findById(id: number): Promise<Match> {
    const result = await this.matchRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Match not found');
    }
    return result;
  }

  async update(id: number, data: Partial<Match>): Promise<Match> {
    const result = await this.findById(id);
    return this.matchRepository.save({ ...result, ...data });
  }

  async remove(id: number): Promise<void> {
    const result = await this.findById(id);
    await this.matchRepository.remove(result);
  }
}
