import { PartialType } from '@nestjs/mapped-types';
import { CreateLeagueTeamDto } from './create-league_team.dto';

export class UpdateLeagueTeamDto extends PartialType(CreateLeagueTeamDto) {}
