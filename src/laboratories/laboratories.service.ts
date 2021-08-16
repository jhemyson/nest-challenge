import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../_utils/enum/status.enum';
import { Repository } from 'typeorm';
import { CreateLaboratoryDto } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';
import { Laboratory } from './entities/laboratory.entity';

@Injectable()
export class LaboratoriesService {
  constructor(
    @InjectRepository(Laboratory)
    private readonly laboratioryRepo: Repository<Laboratory>,
  ) {}

  async create(createLaboratoryDto: CreateLaboratoryDto): Promise<Laboratory> {
    const newLaboratory = this.laboratioryRepo.create(createLaboratoryDto);

    return await this.laboratioryRepo.save(newLaboratory);
  }

  async findAll(): Promise<Laboratory[]> {
    return await this.laboratioryRepo.find({
      where: { status: Status.ACTIVE },
    });
  }

  async findOne(id: number): Promise<Laboratory> {
    const lab = await this.laboratioryRepo.findOne(id);

    if (!lab) {
      throw new NotFoundException(`Lab ID ${id} not found`);
    }

    return lab;
  }

  async update(
    id: number,
    updateLaboratoryDto: UpdateLaboratoryDto,
  ): Promise<Laboratory> {
    const updateLab = await this.laboratioryRepo.update(
      id,
      updateLaboratoryDto,
    );

    if (updateLab.affected === 0) {
      throw new NotFoundException();
    }

    return await this.laboratioryRepo.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const updateLab = await this.laboratioryRepo.update(id, {
      status: Status.INACTIVE,
    });

    if (updateLab.affected === 0) {
      throw new NotFoundException(`Lab ID ${id} not found`);
    }
  }
}
