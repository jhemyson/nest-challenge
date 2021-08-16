import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LaboratoriesService } from '../laboratories/laboratories.service';
import { Repository } from 'typeorm';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exam.entity';
import { Status } from 'src/_utils/enum/status.enum';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepo: Repository<Exam>,
    @Inject(LaboratoriesService)
    private readonly laboratoriesService: LaboratoriesService,
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    const laboratories = await Promise.all(
      createExamDto.laboratories.map((id) =>
        this.laboratoriesService.findOne(+id),
      ),
    );

    const newExam = this.examRepo.create({
      ...createExamDto,
      laboratories,
    });

    return await this.examRepo.save(newExam);
  }

  findAll(): Promise<Exam[]> {
    return this.examRepo.find({ where: { status: Status.ACTIVE } });
  }

  async findOne(id: number): Promise<Exam> {
    const exam = await this.examRepo.findOne(id);

    if (!exam) {
      throw new NotFoundException(`Exam ID ${id} not found`);
    }

    return exam;
  }

  async findOneWithLabs(name: string): Promise<Exam[]> {
    const exam = await this.examRepo.find({
      where: { name },
      relations: ['laboratories'],
    });

    if (!exam) {
      throw new NotFoundException(`Exam NAME ${name} not found`);
    }

    return exam;
  }

  async update(id: number, updateExamDto: UpdateExamDto): Promise<void> {
    const laboratories =
      updateExamDto.laboratories &&
      (await Promise.all(
        updateExamDto.laboratories?.map((id) =>
          this.laboratoriesService.findOne(+id),
        ),
      ));

    const exam = await this.examRepo.preload({
      id: +id,
      ...updateExamDto,
      laboratories,
    });

    if (!exam) {
      throw new NotFoundException(`Lab ID ${id} not found`);
    }

    this.examRepo.save(exam, { reload: true });
  }

  async remove(id: number) {
    const updateLab = await this.examRepo.update(id, {
      status: Status.INACTIVE,
    });

    if (updateLab.affected === 0) {
      throw new NotFoundException(`Lab ID ${id} not found`);
    }
  }
}
