import { Module } from '@nestjs/common';
import { AssociatenMembersService } from './associaten-members.service';
import { AssociatenMembersController } from './associaten-members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssociatenMember } from './entities/associaten-member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssociatenMember]),
  ],
  controllers: [AssociatenMembersController],
  providers: [AssociatenMembersService],
})
export class AssociatenMembersModule {}
