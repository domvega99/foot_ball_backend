import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { In, Repository } from 'typeorm';
import { Team } from '../teams/entities/team.entity';
import { Score } from '../scores/entities/score.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
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

  async findAllMatches(): Promise<Match[]> {
    return this.matchRepository.find();
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

  async getScoresByLeagueAndTeam(leagueId: number, teamId: number): Promise<{ match_id: number, match: Match | null }[]> {

    const matches = await this.matchRepository.find({
        where: { league_id: leagueId, status: In(['Posted', 'Completed']) },
        relations: ['scores', 'scores.team'], 
    });
    const matchIds = matches.map(match => match.id);
    const scoreData = await this.scoreRepository.find({
        where: { match_id: In(matchIds), team_id: teamId },
        relations: ['match', 'team'], 
    });

    const result = matches.map(match => {
        const score = scoreData.find(score => score.match_id === match.id);
        if (score || match.scores.some(score => score.team_id === teamId)) {
            return {
                match_id: match.id,
                match: match,
            };
        }
        return null;
    }).filter(result => result !== null);

    return result;}
}
