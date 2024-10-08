import { PartialType } from '@nestjs/mapped-types';
import { CreateFootballYearDto } from './create-football-year.dto';

export class UpdateFootballYearDto extends PartialType(CreateFootballYearDto) {}
