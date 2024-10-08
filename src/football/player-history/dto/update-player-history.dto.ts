import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerHistoryDto } from './create-player-history.dto';

export class UpdatePlayerHistoryDto extends PartialType(CreatePlayerHistoryDto) {}
