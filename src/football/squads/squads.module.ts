import { Module } from '@nestjs/common';
import { SquadsService } from './squads.service';
import { SquadsController } from './squads.controller';
import { Squad } from './entities/squad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Squad])
  ],
  controllers: [SquadsController],
  providers: [SquadsService],
})
export class SquadsModule {}
