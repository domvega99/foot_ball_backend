import { PartialType } from '@nestjs/mapped-types';
import { CreateAssociatenMemberDto } from './create-associaten-member.dto';

export class UpdateAssociatenMemberDto extends PartialType(CreateAssociatenMemberDto) {}
