import { Module } from '@nestjs/common';
import { PlayerHistoryService } from './player-history.service';
import { PlayerHistoryController } from './player-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerHistory } from './entities/player-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayerHistory]),
  ],
  controllers: [PlayerHistoryController],
  providers: [PlayerHistoryService],
})
export class PlayerHistoryModule {}
