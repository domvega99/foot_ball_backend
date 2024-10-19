import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendlyMatchDto } from './dto/create-friendly_match.dto';
import { UpdateFriendlyMatchDto } from './dto/update-friendly_match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendlyMatch } from './entities/friendly_match.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendlyMatchesService {
  constructor(
    @InjectRepository(FriendlyMatch)
    private friendlyMatchRepository: Repository<FriendlyMatch>,
  ) {}

  async create(data: Partial<FriendlyMatch>): Promise<FriendlyMatch> {
    const result = this.friendlyMatchRepository.create(data);
    return this.friendlyMatchRepository.save(result);
  }

  async findAll(): Promise<FriendlyMatch[]> {
    return this.friendlyMatchRepository.find({ relations: ['teamA', 'teamB'] });
  }

  async findById(id: number): Promise<FriendlyMatch> {
    const result = await this.friendlyMatchRepository.findOne({ where: { id: id }});
    if (!result) {
      throw new NotFoundException('Friendly match not found');
    }
    return result;
  }

  async update(id: number, data: Partial<FriendlyMatch>): Promise<FriendlyMatch> {
    const result = await this.findById(id);
    if (result.teamAId === data.teamBId || result.teamBId === data.teamAId) {
      throw new BadRequestException('This team already exist in this match.');
    }
    return this.friendlyMatchRepository.save({ ...result, ...data });
  }

  async remove(id: number): Promise<void> {
    const result = await this.findById(id);
    await this.friendlyMatchRepository.remove(result);
  }

  async findAllByLeagueId(leagueId: number): Promise<FriendlyMatch[]> {
    return this.friendlyMatchRepository.find({ 
      where: { stat: 1, league_id: leagueId }, 
      order: { match_date: 'DESC', match_time: 'ASC' },
      relations: ['teamA', 'teamB']
    });
  }
}
