import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Teacher } from '../teacher/entities/teacher.entity';
import { Evaluation } from '../evaluation/entities/evaluation.entity';
import { Subject } from '../subject/entities/subject.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @InjectRepository(Teacher)
    private teachersRepository: Repository<Teacher>,
    @InjectRepository(Evaluation)
    private evaluationsRepository: Repository<Evaluation>,
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const { teachers, subjects, evaluations,...studentData } = createStudentDto;
    const student = await this.studentsRepository.create(studentData);
  
    if (teachers) {
      student.teachers = await this. teachersRepository.findByIds(teachers)
    }
    if (subjects) {
      student.subjects = await this. subjectsRepository.findByIds(subjects)
    }
    if (evaluations) {
      student.evaluations = await this. evaluationsRepository.findByIds(evaluations)
    }
  
    return this.studentsRepository.save(student);
  }

  findAll(): Promise<Student[]> {
    return this.studentsRepository.find({relations:['teachers', 'subjects', 'evaluations']});
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { id },
      relations: ['teachers', 'subjects', 'evaluations'],
    });

    if (!student)
      throw new NotFoundException(`Student with ID ${id} not found`);
    return student;
  }

  /* async update(id: number, updateStudentDto: UpdateStudentDto): Promise<void> {
    await this.studentsRepository.update(id, updateStudentDto);
  } */

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const { teachers, subjects, evaluations, ...studentData } =
      updateStudentDto;

    let student = await this.studentsRepository.preload({ id, ...studentData });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    if (teachers) {
      student.teachers = await this.teachersRepository.findByIds(teachers);
    }
    if (subjects) {
      student.subjects = await this.subjectsRepository.findByIds(subjects);
    }
    if (evaluations) {
      student.evaluations =
        await this.evaluationsRepository.findByIds(evaluations);
    }

    return this.studentsRepository.save(student);
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.studentsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }
    } catch (error) {
      if (error.code === '23503') {
        throw new BadRequestException(`Cannot delete student with ID ${id} because it is referenced by other records`);
      }
      throw error;
    }
  }
}
