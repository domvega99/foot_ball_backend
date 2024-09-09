import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerScoreDto } from './create-player_score.dto';

export class UpdatePlayerScoreDto extends PartialType(CreatePlayerScoreDto) {}
