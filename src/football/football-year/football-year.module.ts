import { Module } from '@nestjs/common';
import { FootballYearService } from './football-year.service';
import { FootballYearController } from './football-year.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FootballYear } from './entities/football-year.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FootballYear]),
  ],
  controllers: [FootballYearController],
  providers: [FootballYearService],
})
export class FootballYearModule {}
