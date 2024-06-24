import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../subject/entities/subject.entity';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Evaluation)
    private readonly EvaluationRepository: Repository<Evaluation>
) {}

async create(createEvaluationDto: CreateEvaluationDto): Promise<Evaluation> {
  const foundSubject = await this.subjectRepository.findOne({ where: { id: createEvaluationDto.subject.id } });
  if (!foundSubject) {
    throw new NotFoundException('Subject not found');
  }

  const evaluation = this.EvaluationRepository.create({
    ...createEvaluationDto,
    subject: foundSubject,
  });

  return this.EvaluationRepository.save(evaluation);
}

  async findAll():Promise<Evaluation[]> {
    return await this.EvaluationRepository.find({relations:['subject']})
  }

  async findOne(id: number): Promise<Evaluation> {
    const evaluation = await this.EvaluationRepository.findOne({ where: { id }, relations: ['subject'] });
    if (!evaluation) {
      throw new NotFoundException(`Evaluation with ID ${id} not found`);
    }
    return evaluation;
  }

  async update(id: number, updateEvaluationDto: UpdateEvaluationDto): Promise<Evaluation> {
    const { subject, ...rest } = updateEvaluationDto;
    const evaluation = await this.EvaluationRepository.preload({ id, ...rest });

    if (!evaluation) {
      throw new NotFoundException(`Evaluation with ID ${id} not found`);
    }

    if (subject && subject.id) {
      const foundSubject = await this.subjectRepository.findOne({ where: { id: subject.id } });
      if (!foundSubject) {
        throw new NotFoundException('Subject not found');
      }
      evaluation.subject = foundSubject;
    }

    return this.EvaluationRepository.save(evaluation);
  }

  async remove(id: number): Promise<void> {
    const result = await this.EvaluationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Evaluation with ID ${id} not found`);
    }
  }
}

