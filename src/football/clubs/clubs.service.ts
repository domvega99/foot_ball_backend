import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Club } from './entities/club.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {}

  async create(data: Partial<Club>): Promise<Club> {
    const result = this.clubRepository.create(data);
    return this.clubRepository.save(result);
  }

  async findAll(): Promise<Club[]> {
    return this.clubRepository.find();
  }

  async findById(id: number): Promise<Club> {
    const result = await this.clubRepository.findOne({ where: { id: id }});
    if (!result) {
      throw new NotFoundException('Club not found');
    }
    return result;
  }

  async update(id: number, data: Partial<Club>): Promise<Club> {
    const result = await this.findById(id);
    return this.clubRepository.save({ ...result, ...data });
  }

  async remove(id: number): Promise<void> {
    const result = await this.findById(id);
    await this.clubRepository.remove(result);
  }
}
