import { Test, TestingModule } from '@nestjs/testing';
import { LeagueTeamsController } from './league_teams.controller';
import { LeagueTeamsService } from './league_teams.service';

describe('LeagueTeamsController', () => {
  let controller: LeagueTeamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeagueTeamsController],
      providers: [LeagueTeamsService],
    }).compile();

    controller = module.get<LeagueTeamsController>(LeagueTeamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
