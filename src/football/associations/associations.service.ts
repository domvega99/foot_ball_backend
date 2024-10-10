import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssociationDto } from './dto/create-association.dto';
import { UpdateAssociationDto } from './dto/update-association.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Association } from './entities/association.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssociationsService {
  constructor(
    @InjectRepository(Association)
    private associationRepository: Repository<Association>,
  ) {}

  async create(data: Partial<Association>): Promise<Association> {
    const result = this.associationRepository.create(data);
    return this.associationRepository.save(result);
  }

  async findAll(): Promise<Association[]> {
    return this.associationRepository.find({ relations: ['members'] });
  }

  async findById(id: number): Promise<Association> {
    const result = await this.associationRepository.findOne({ where: { id: id }, relations: ['members'] });
    if (!result) {
      throw new NotFoundException('Association not found');
    }
    return result;
  }

  async update(id: number, data: Partial<Association>): Promise<Association> {
    const result = await this.findById(id);
    return this.associationRepository.save({ ...result, ...data });
  }

  async remove(id: number): Promise<void> {
    const result = await this.findById(id);
    await this.associationRepository.remove(result);
  }
  
}
