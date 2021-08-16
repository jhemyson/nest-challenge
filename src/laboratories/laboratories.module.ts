import { Module } from '@nestjs/common';
import { LaboratoriesController } from './laboratories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoriesService } from './laboratories.service';
import { Laboratory } from './entities/laboratory.entity';
import { Exam } from '../exams/entities/exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Laboratory, Exam])],
  controllers: [LaboratoriesController],
  providers: [LaboratoriesService],
})
export class LaboratoriesModule {}
