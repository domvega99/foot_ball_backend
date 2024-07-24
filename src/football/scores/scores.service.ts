import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Repository } from 'typeorm';
import { LeagueTeam } from '../league_teams/entities/league_team.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
    @InjectRepository(LeagueTeam)
    private readonly leagueTeamRepository: Repository<LeagueTeam>,
  ) {}

  async create(data: Partial<Score>): Promise<Score> {
    const existingScore = await this.scoreRepository.findOne({
      where: {
        match_id: data.match_id,
        team_id: data.team_id,
      },
    });

    if (existingScore) {
      throw new BadRequestException('This team already exist in this match.');
    }
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

  async update(id: number, data: Partial<Score>, leagueId: number): Promise<Score> {
    const result = await this.findById(id);
    if (data.match_id && data.team_id) {
        const existingScore = await this.scoreRepository.findOne({
            where: {
                match_id: data.match_id,
                team_id: data.team_id,
            },
        });

        if (existingScore && existingScore.id !== id) {
            throw new BadRequestException('This team already exists in this match.');
        }
    }

    const updatedScore = await this.scoreRepository.save({ ...result, ...data });
    if (data.result && result.result !== data.result) {
        const leagueTeam = await this.leagueTeamRepository.findOne({ 
            where: { team_id: updatedScore.team_id, league_id: leagueId } 
        });

        if (leagueTeam) {
            this.adjustLeagueTeamStats(leagueTeam, result.result, -1);
            this.adjustLeagueTeamStats(leagueTeam, data.result, 1);

            if (!result.result) {
              leagueTeam.played += 1;
            }
            await this.leagueTeamRepository.save(leagueTeam);
        }
    }
    return updatedScore;
  }

  private adjustLeagueTeamStats(leagueTeam: LeagueTeam, result: string, change: number): void {
      switch (result) {
          case 'Win':
              leagueTeam.won += change;
              break;
          case 'Loss':
              leagueTeam.lost += change;
              break;
          case 'Draw':
              leagueTeam.drawn += change;
              break;
      }
  }

  // async update(id: number, data: Partial<Score>, leagueId: number): Promise<Score> {
  //   const result = await this.findById(id);

  //   if (data.match_id && data.team_id) {
  //       const existingScore = await this.scoreRepository.findOne({
  //           where: {
  //               match_id: data.match_id,
  //               team_id: data.team_id,
  //           },
  //       });

  //       if (existingScore && existingScore.id !== id) {
  //           throw new BadRequestException('This team already exists in this match.');
  //       }
  //   }

  //   const updatedScore = await this.scoreRepository.save({ ...result, ...data });

  //   if (data.result === 'Win' && result.result !== 'Win') {
  //     const leagueTeam = await this.leagueTeamRepository.findOne({ where: { team_id: updatedScore.team_id, league_id: leagueId } });
  //     if (leagueTeam) {
  //       leagueTeam.won += 1;
  //       await this.leagueTeamRepository.save(leagueTeam);
  //     }
  //   } else if (data.result === 'Loss' && result.result !== 'Loss') {
  //     const leagueTeam = await this.leagueTeamRepository.findOne({ where: { team_id: updatedScore.team_id, league_id: leagueId } });
  //     if (leagueTeam) {
  //       leagueTeam.lost += 1;
  //       await this.leagueTeamRepository.save(leagueTeam);
  //     }
  //   } else if (data.result === 'Draw' && result.result !== 'Draw') {
  //     const leagueTeam = await this.leagueTeamRepository.findOne({ where: { team_id: updatedScore.team_id, league_id: leagueId } });
  //     if (leagueTeam) {
  //       leagueTeam.drawn += 1;
  //       await this.leagueTeamRepository.save(leagueTeam);
  //     }
  //   } 


  //   if (data.result === 'Loss' && result.result === 'Win') {
  //     const leagueTeam = await this.leagueTeamRepository.findOne({ where: { team_id: updatedScore.team_id, league_id: leagueId } });
  //     if (leagueTeam) {
  //       leagueTeam.won -= 1;
  //       await this.leagueTeamRepository.save(leagueTeam);
  //     }
  //   } else if (data.result === 'Loss' && result.result === 'Draw') {
  //     const leagueTeam = await this.leagueTeamRepository.findOne({ where: { team_id: updatedScore.team_id, league_id: leagueId } });
  //     if (leagueTeam) {
  //       leagueTeam.drawn -= 1;
  //       await this.leagueTeamRepository.save(leagueTeam);
  //     }
  //   } 
    

  //   return updatedScore;
  // }

  async remove(id: number): Promise<void> {
    const team = await this.findById(id);
    await this.scoreRepository.remove(team);
  }

  async updateScore(scoreId: number, newResult: string): Promise<Score> {
    const score = await this.scoreRepository.findOne({ where: { id: scoreId } });
    if (!score) {
        throw new Error('Score not found');
    }

    score.result = newResult;
    await this.scoreRepository.save(score);

    const leagueTeam = await this.leagueTeamRepository.findOne({ where: { team: score.team } });
    if (!leagueTeam) {
        throw new Error('LeagueTeam not found');
    }

    if (newResult === 'W') {
        leagueTeam.won += 1;
    }

    await this.leagueTeamRepository.save(leagueTeam);
    return score;
}
}
