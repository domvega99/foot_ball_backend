import { Module } from '@nestjs/common';
import { TeamGroupsService } from './team-groups.service';
import { TeamGroupsController } from './team-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamGroup } from './entities/team-group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamGroup]),
  ],
  controllers: [TeamGroupsController],
  providers: [TeamGroupsService],
})
export class TeamGroupsModule {}
