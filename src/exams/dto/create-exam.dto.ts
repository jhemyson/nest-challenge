import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ExamType } from '../../_utils/enum/exam-type.enum';

export class CreateExamDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: ExamType })
  @IsEnum(ExamType)
  @IsNotEmpty()
  type: ExamType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  laboratories: string[];
}
