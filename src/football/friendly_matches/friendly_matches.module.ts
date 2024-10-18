import { Module } from '@nestjs/common';
import { FriendlyMatchesService } from './friendly_matches.service';
import { FriendlyMatchesController } from './friendly_matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendlyMatch } from './entities/friendly_match.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendlyMatch]),
  ],
  controllers: [FriendlyMatchesController],
  providers: [FriendlyMatchesService],
})
export class FriendlyMatchesModule {}
