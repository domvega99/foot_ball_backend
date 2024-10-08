import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerHistoryDto } from './dto/create-player-history.dto';
import { UpdatePlayerHistoryDto } from './dto/update-player-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerHistory } from './entities/player-history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerHistoryService {
  constructor(
    @InjectRepository(PlayerHistory)
    private playerHistoryRepository: Repository<PlayerHistory>,
  ) {}

  async create(data: Partial<PlayerHistory>): Promise<PlayerHistory> {
    const result = this.playerHistoryRepository.create(data);
    return this.playerHistoryRepository.save(result);
  }

  async findAll(): Promise<PlayerHistory[]> {
    return this.playerHistoryRepository.find();
  }

  async findById(id: number): Promise<PlayerHistory> {
    const result = await this.playerHistoryRepository.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Associaten member not found');
    }
    return result;
  }

  async update(id: number, data: Partial<PlayerHistory>): Promise<PlayerHistory> {
    const result = await this.findById(id);
    return this.playerHistoryRepository.save({ ...result, ...data });
  }

  async remove(id: number): Promise<void> {
    const result = await this.findById(id);
    await this.playerHistoryRepository.remove(result);
  }
}
