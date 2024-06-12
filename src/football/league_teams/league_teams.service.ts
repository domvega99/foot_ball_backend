import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeagueTeamDto } from './dto/create-league_team.dto';
import { UpdateLeagueTeamDto } from './dto/update-league_team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeagueTeam } from './entities/league_team.entity';

@Injectable()
export class LeagueTeamsService {
  constructor(
    @InjectRepository(LeagueTeam)
    private leagueTeamRepository: Repository<LeagueTeam>,
  ) {}

  async createBulk(data: Partial<LeagueTeam>[]): Promise<LeagueTeam[]> {
    const existingLeagueTeams = await this.leagueTeamRepository.find({
      where: data.map(item => ({
        league_id: item.league_id,
        team_id: item.team_id,
      })),
    });

    const existingCombinations = new Set(
      existingLeagueTeams.map(team => `${team.league_id}-${team.team_id}`)
    );

    const newLeagueTeams = data
      .filter(item => !existingCombinations.has(`${item.league_id}-${item.team_id}`))
      .map(item => this.leagueTeamRepository.create({
        ...item,
      }));

    return this.leagueTeamRepository.save(newLeagueTeams);
  }

  async create(data: Partial<LeagueTeam>): Promise<LeagueTeam> {
    const response = this.leagueTeamRepository.create(data);
    return this.leagueTeamRepository.save(response);
  }

  async findAll(leagueId: number): Promise<LeagueTeam[]> {
    return this.leagueTeamRepository.find({ 
      where: { league_id: leagueId }, 
      relations: ['team'] 
    });
  }

  async findById(id: number): Promise<LeagueTeam> {
    const result = await this.leagueTeamRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Team not found');
    }
    return result;
  }

  async update(id: number, data: Partial<LeagueTeam>): Promise<LeagueTeam> {
    const response = await this.findById(id);
    return this.leagueTeamRepository.save({ ...response, ...data });
  }

  async remove(id: number): Promise<void> {
    const response = await this.findById(id);
    await this.leagueTeamRepository.remove(response);
  }
}
