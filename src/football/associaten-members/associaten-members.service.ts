import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssociatenMemberDto } from './dto/create-associaten-member.dto';
import { UpdateAssociatenMemberDto } from './dto/update-associaten-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssociatenMember } from './entities/associaten-member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssociatenMembersService {
  constructor(
    @InjectRepository(AssociatenMember)
    private associatenMemberRepository: Repository<AssociatenMember>,
  ) {}

  async create(data: Partial<AssociatenMember>): Promise<AssociatenMember> {
    const result = this.associatenMemberRepository.create(data);
    return this.associatenMemberRepository.save(result);
  }

  async findAll(): Promise<AssociatenMember[]> {
    return this.associatenMemberRepository.find({ relations: ['association'] });
  }

  async findById(id: number): Promise<AssociatenMember> {
    const result = await this.associatenMemberRepository.findOne({ where: { id: id }, relations: ['association'] });
    if (!result) {
      throw new NotFoundException('Associaten member not found');
    }
    return result;
  }

  async update(id: number, data: Partial<AssociatenMember>): Promise<AssociatenMember> {
    const result = await this.findById(id);
    return this.associatenMemberRepository.save({ ...result, ...data });
  }

  async remove(id: number): Promise<void> {
    const result = await this.findById(id);
    await this.associatenMemberRepository.remove(result);
  }
}
