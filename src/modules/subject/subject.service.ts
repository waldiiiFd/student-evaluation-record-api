import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { Evaluation } from '../evaluation/entities/evaluation.entity';
import { Student } from '../student/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const { teachers, evaluations, students, ...subjectData } = createSubjectDto;
    const subject = this.subjectRepository.create(subjectData);

    if (teachers) {
      subject.teachers = await this.teacherRepository.findByIds(teachers);
    }
    if (evaluations) {
      subject.evaluations = await this.evaluationRepository.findByIds(evaluations);
    }
    if (students) {
      subject.students = await this.studentRepository.findByIds(students);
    }

    return this.subjectRepository.save(subject);
  }
  
  findAll(): Promise<Subject[]> {
    return this.subjectRepository.find({ relations: ['teachers', 'evaluations', 'students'] });
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOne({ where: { id }, relations: ['teachers', 'evaluations', 'students'] });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    const { teachers, evaluations, students, ...subjectData } = updateSubjectDto;

    let subject = await this.subjectRepository.preload({ id, ...subjectData });

    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }

    if (teachers) {
      subject.teachers = await this.teacherRepository.findByIds(teachers);
    }
    if (evaluations) {
      subject.evaluations = await this.evaluationRepository.findByIds(evaluations);
    }
    if (students) {
      subject.students = await this.studentRepository.findByIds(students);
    }

    return this.subjectRepository.save(subject);
  }

  async remove(id: number): Promise<void> {
    const result = await this.subjectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }
  }
}
