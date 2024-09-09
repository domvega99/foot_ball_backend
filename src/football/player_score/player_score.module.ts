import { Module } from '@nestjs/common';
import { PlayerScoreService } from './player_score.service';
import { PlayerScoreController } from './player_score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerScore } from './entities/player_score.entity';

@Module({
  controllers: [PlayerScoreController],
  imports: [
    TypeOrmModule.forFeature([PlayerScore])
  ],
  providers: [PlayerScoreService],
})
export class PlayerScoreModule {}
