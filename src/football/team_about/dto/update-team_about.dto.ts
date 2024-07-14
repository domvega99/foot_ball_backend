import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamAboutDto } from './create-team_about.dto';

export class UpdateTeamAboutDto extends PartialType(CreateTeamAboutDto) {}
