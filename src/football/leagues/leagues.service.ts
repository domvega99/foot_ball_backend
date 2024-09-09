import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeagueDto } from './dto/create-league.dto';
import { UpdateLeagueDto } from './dto/update-league.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { League } from './entities/league.entity';
import { Repository } from 'typeorm';
import { Match } from '../matches/entities/match.entity';

@Injectable()
export class LeaguesService {
  constructor(
    @InjectRepository(League)
    private leagueRepository: Repository<League>,
  ) {}

  async create(leagueData: Partial<League>): Promise<League> {
    const leagueDataWithTimestamps = {
        ...leagueData,
        created_on: new Date(), 
    };
    const league = this.leagueRepository.create(leagueDataWithTimestamps);
    return this.leagueRepository.save(league);
  }


  async findAll(): Promise<League[]> {
    return this.leagueRepository.find({
      order: {
        created_on: 'DESC',
      },
    });
  }

  async findAllPostedLeague(): Promise<League[]> {
    return this.leagueRepository.find({ where: { status: 'Posted' } });
  }


  async findAllLeaguesWithTeams(): Promise<League[]> { 
    return await this.leagueRepository
      .createQueryBuilder('league')
      .leftJoinAndSelect('league.teams', 'leagueTeam')
      .leftJoinAndSelect('leagueTeam.team', 'team')
      .where('league.stat = :leagueStat', { leagueStat: 1 })
      .andWhere('leagueTeam.stat = :teamStat', { teamStat: 1 })
      .andWhere('league.status = :leagueStatus', { leagueStatus: 'Posted' })
      .getMany();
  }

  async getPostedLeaguesWithPostedMatches(): Promise<League[]> {
    const leagues = await this.leagueRepository
      .createQueryBuilder('league')
      .leftJoinAndSelect('league.matches', 'match', 'match.status IN (:...matchStatuses)', {
        matchStatuses: ['Posted', 'Completed'],
      })
      .leftJoinAndSelect('match.scores', 'score')
      .leftJoinAndSelect('score.team', 'team')
      .where('league.status = :leagueStatus', { leagueStatus: 'Posted' })
      .orderBy('match.match_date', 'ASC') 
      .addOrderBy('match.match_time', 'ASC')
      .getMany();

      leagues.forEach((league: any) => {
          const groupedMatches = new Map<string, Match[]>();

          league.matches.forEach((match) => {
              const matchDate = new Date(match.match_date);
              const formattedDate = matchDate.toISOString().split('T')[0];

              if (!groupedMatches.has(formattedDate)) {
                  groupedMatches.set(formattedDate, []);
              }
              groupedMatches.get(formattedDate).push(match);
          });

          league.matches = Array.from(groupedMatches, ([matchDate, matches]) => ({
              match_date: matches[0].match_date,
              matches: matches,
          }));
      });

      return leagues;
  }


  // async getPostedLeaguesWithPostedMatches(): Promise<League[]> {
  //   const leagues = await this.leagueRepository
  //     .createQueryBuilder('league')
  //     .leftJoinAndSelect('league.matches', 'match', 'match.status IN (:...matchStatuses)', {
	// 			matchStatuses: ['Posted', 'Completed', 'Live'],
	// 		})
  //     .leftJoinAndSelect('match.scores', 'score')
  //     .leftJoinAndSelect('score.team', 'team')
  //     .where('league.status = :leagueStatus', { leagueStatus: 'Posted' })
  //     .orderBy('match.match_date', 'ASC') 
  //     .addOrderBy('match.match_time', 'ASC')
  //     .getMany();

  //   leagues.forEach((league: any) => {
  //     const groupedMatches = new Map<string, Match[]>(); 

  //     league.matches.forEach((match) => {
  //       const matchDate = new Date(match.match_date); 
  //       const formattedDate = matchDate.toISOString().split('T')[0]; 

  //       if (!groupedMatches.has(formattedDate)) {
  //         groupedMatches.set(formattedDate, []);
  //       }
  //       groupedMatches.get(formattedDate).push(match);
  //     });

  //     league.matches = Array.from(groupedMatches, ([matchDate, matches]) => ({
  //       match_date: matches[0].match_date, 
  //       matches: matches,
  //     }));
  //   });

  //   return leagues;
  // }
  
  async findById(id: number): Promise<League> {
    const league = await this.leagueRepository.findOne({ where: { id: id } });
    if (!league) {
      throw new NotFoundException('Team not found');
    }
    return league;
  }

  async update(id: number, leagueData: Partial<League>): Promise<League> {
    const league = await this.findById(id);
    const updatedLeagueData = {
        ...league,
        ...leagueData,
        modified_on: new Date(),  
    };
    return this.leagueRepository.save(updatedLeagueData);
}


  async remove(id: number): Promise<void> {
    const league = await this.findById(id);
    await this.leagueRepository.remove(league);
  }
}
