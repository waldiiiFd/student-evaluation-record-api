import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../subject/entities/subject.entity';
import { Student } from '../student/entities/student.entity';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Evaluation)
    private readonly EvaluationRepository: Repository<Evaluation>
  ) {}

  async create(createEvaluationDto: CreateEvaluationDto): Promise<Evaluation> {
    const { subject, student, ...rest } = createEvaluationDto;

    if (!subject || !subject.id) {
      throw new NotFoundException('Subject ID not provided');
    }

    if (!student || !student.id) {
      throw new NotFoundException('Student ID not provided');
    }

    const foundSubject = await this.subjectRepository.findOne({ where: { id: subject.id } });
    if (!foundSubject) {
      throw new NotFoundException('Subject not found');
    }

    const foundStudent = await this.studentRepository.findOne({ where: { id: student.id } });
    if (!foundStudent) {
      throw new NotFoundException('Student not found');
    }

    const evaluation = this.EvaluationRepository.create({
      ...rest,
      subject: foundSubject,
      student: foundStudent,
    });

    return this.EvaluationRepository.save(evaluation);
  }

  async findAll(): Promise<Evaluation[]> {
    return await this.EvaluationRepository.find({ relations: ['subject', 'student'] });
  }

  async findOne(id: number): Promise<Evaluation> {
    const evaluation = await this.EvaluationRepository.findOne({ where: { id }, relations: ['subject', 'student'] });
    if (!evaluation) {
      throw new NotFoundException(`Evaluation with ID ${id} not found`);
    }
    return evaluation;
  }

  async update(id: number, updateEvaluationDto: UpdateEvaluationDto): Promise<Evaluation> {
    const { subject, student, ...rest } = updateEvaluationDto;
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

    if (student && student.id) {
      const foundStudent = await this.studentRepository.findOne({ where: { id: student.id } });
      if (!foundStudent) {
        throw new NotFoundException('Student not found');
      }
      evaluation.student = foundStudent;
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

