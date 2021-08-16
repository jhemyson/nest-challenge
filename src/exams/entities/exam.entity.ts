import { Laboratory } from '../../laboratories/entities/laboratory.entity';
import { Status } from '../../_utils/enum/status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExamType } from '../../_utils/enum/exam-type.enum';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: ExamType;

  @Column({ default: Status.ACTIVE })
  status: Status;

  @ManyToMany(() => Laboratory, (lab) => lab.exams)
  laboratories: Laboratory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
