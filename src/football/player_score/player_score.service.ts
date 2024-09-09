import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerScoreDto } from './dto/create-player_score.dto';
import { UpdatePlayerScoreDto } from './dto/update-player_score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerScore } from './entities/player_score.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerScoreService {
  constructor(
    @InjectRepository(PlayerScore)
    private playerScoreRepository: Repository<PlayerScore>,
  ) {}

  async create(data: Partial<PlayerScore>): Promise<PlayerScore> {
    const playerScore = this.playerScoreRepository.create(data);
    return this.playerScoreRepository.save(playerScore);
  }

  async findAll(): Promise<PlayerScore[]> {
    return this.playerScoreRepository.find();
  }

  async findById(id: number): Promise<PlayerScore> {
    const playerScore = await this.playerScoreRepository.findOne({ where: { id: id } });
    if (!playerScore) {
      throw new NotFoundException('Player score not found');
    }
    return playerScore;
  }

  async findByTeamId(teamId: number, matchId: number): Promise<PlayerScore[]> {
    return this.playerScoreRepository.find({ where: { team_id: teamId, match_id: matchId, }, relations: ['player'], });
  }

  async update(id: number, data: Partial<PlayerScore>): Promise<PlayerScore> {
    const playerScore = await this.findById(id);
    return this.playerScoreRepository.save({ ...playerScore, ...data });
  }

  async remove(id: number): Promise<void> {
    const playerScore = await this.findById(id);
    await this.playerScoreRepository.remove(playerScore);
  }
}
