import { Test, TestingModule } from '@nestjs/testing';
import { LeagueTeamsService } from './league_teams.service';

describe('LeagueTeamsService', () => {
  let service: LeagueTeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeagueTeamsService],
    }).compile();

    service = module.get<LeagueTeamsService>(LeagueTeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
