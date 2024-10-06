import { Module } from '@nestjs/common';
import { TiersService } from './tiers.service';
import { TiersController } from './tiers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tier } from './entities/tier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tier]),
  ],
  controllers: [TiersController],
  providers: [TiersService],
})
export class TiersModule {}
