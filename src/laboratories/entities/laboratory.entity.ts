import { Status } from '../../_utils/enum/status.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Exam } from '../../exams/entities/exam.entity';

@Entity()
export class Laboratory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  eddress: string;

  @Column({ default: Status.ACTIVE })
  status: Status;

  @JoinTable()
  @ManyToMany(() => Exam, (exam) => exam.laboratories, {
    cascade: true,
  })
  exams: Exam[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
