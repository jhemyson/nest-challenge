import { PartialType } from '@nestjs/swagger';
import { CreateLaboratoryDto } from './create-laboratory.dto';

export class UpdateLaboratoryDto extends PartialType(CreateLaboratoryDto) {}
