import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Not, Repository } from 'typeorm';
import { LeagueTeam } from '../league_teams/entities/league_team.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
    @InjectRepository(LeagueTeam)
    private readonly leagueTeamRepository: Repository<LeagueTeam>,
  ) {}

  async create(data: Partial<Score>, leagueId: number): Promise<Score> {

    const existingLeagueTeam = await this.leagueTeamRepository.findOne({ 
        where: { team_id: data.team_id, league_id: leagueId } 
    });
    if (!existingLeagueTeam) {
      throw new BadRequestException('This team was not added in the league standings.');
    }

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

    const leagueTeam = await this.leagueTeamRepository.findOne({
        where: { team_id: updatedScore.team_id, league_id: leagueId }
    });

    if (leagueTeam) {
        const totalPoints = await this.calculateTotalPoints(updatedScore.team_id, leagueId);
        leagueTeam.goals_for = totalPoints;

        if (data.result && result.result !== data.result) {
            this.adjustLeagueTeamStats(leagueTeam, result.result, -1);
            this.adjustLeagueTeamStats(leagueTeam, data.result, 1);

            if (!result.result) {
                leagueTeam.played += 1;
            }
        }

        const totalGoalsAgainst = await this.calculateGoalsAgainst(updatedScore.team_id, leagueId);
        leagueTeam.goals_against = totalGoalsAgainst;
        leagueTeam.goals_difference = leagueTeam.goals_for - leagueTeam.goals_against;

        await this.leagueTeamRepository.save(leagueTeam);

        // Fetch the opposing team's score
        const opposingScore = await this.scoreRepository.findOne({
            where: {
                match_id: updatedScore.match_id,
                team_id: Not(updatedScore.team_id),
            },
        });

        if (opposingScore) {
            const opposingLeagueTeam = await this.leagueTeamRepository.findOne({
                where: { team_id: opposingScore.team_id, league_id: leagueId }
            });

            if (opposingLeagueTeam) {
                const opposingTotalPoints = await this.calculateTotalPoints(opposingScore.team_id, leagueId);
                opposingLeagueTeam.goals_for = opposingTotalPoints;

                const opposingTotalGoalsAgainst = await this.calculateGoalsAgainst(opposingScore.team_id, leagueId);
                opposingLeagueTeam.goals_against = opposingTotalGoalsAgainst;
                opposingLeagueTeam.goals_difference = opposingLeagueTeam.goals_for - opposingLeagueTeam.goals_against;

                if (data.result && result.result !== data.result) {
                    this.adjustLeagueTeamStats(opposingLeagueTeam, opposingScore.result, -1);
                    let opposingResult: string | null = null;

                    if (data.result === 'Win') {
                        opposingResult = 'Loss';
                    } else if (data.result === 'Loss') {
                        opposingResult = 'Win';
                    } else if (data.result === 'Draw') {
                        opposingResult = 'Draw';
                    }

                    this.adjustLeagueTeamStats(opposingLeagueTeam, opposingResult, 1);

                    if (!result.result) {
                        opposingLeagueTeam.played += 1;
                    }

                    opposingScore.result = opposingResult;
                    await this.scoreRepository.save(opposingScore);
                }

                await this.leagueTeamRepository.save(opposingLeagueTeam);
            }
        } else {
            throw new BadRequestException('Add opposing team for this match.');
        }
    }

    return updatedScore;
  }

  private adjustLeagueTeamStats(leagueTeam: LeagueTeam, result: string | null, change: number): void {
      if (!result) return;
      switch (result) {
          case 'Win':
              leagueTeam.won += change;
              leagueTeam.points += change * 3;
              break;
          case 'Loss':
              leagueTeam.lost += change;
              // No change in points for loss
              break;
          case 'Draw':
              leagueTeam.drawn += change;
              leagueTeam.points += change * 1;
              break;
      }
  }

  private async calculateTotalPoints(team_id: number, leagueId: number): Promise<number> {
      const scores = await this.scoreRepository.find({
          where: { team_id, match: { league_id: leagueId } }
      });

      return scores.reduce((total, score) => total + (score.points || 0), 0);
  }

  private async calculateGoalsAgainst(team_id: number, leagueId: number): Promise<number> {
      const matches = await this.scoreRepository.find({
          where: { team_id, match: { league_id: leagueId } }
      });

      let totalGoalsAgainst = 0;

      for (const match of matches) {
          const opposingScores = await this.scoreRepository.find({
              where: {
                  match_id: match.match_id,
                  team_id: Not(team_id),
                  match: { league_id: leagueId }
              }
          });

          totalGoalsAgainst += opposingScores.reduce((total, score) => total + (score.points || 0), 0);
      }

      return totalGoalsAgainst;
  }

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
