import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';
import { Laboratory } from '../laboratories/entities/laboratory.entity';
import { Exam } from './entities/exam.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoriesService } from '../laboratories/laboratories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Laboratory, Exam])],
  controllers: [ExamsController],
  providers: [ExamsService, LaboratoriesService],
})
export class ExamsModule {}
