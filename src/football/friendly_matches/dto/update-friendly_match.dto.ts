import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendlyMatchDto } from './create-friendly_match.dto';

export class UpdateFriendlyMatchDto extends PartialType(CreateFriendlyMatchDto) {}
