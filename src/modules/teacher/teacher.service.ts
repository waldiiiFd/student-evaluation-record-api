import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../subject/entities/subject.entity';
import { Student } from '../student/entities/student.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  /*  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { subject, students, ...teacherData } = createTeacherDto;
    const teacher = await this.teacherRepository.create(teacherData);

    if (subject) {
      teacher.subject = await this. subjectRepository.findByIds(subject);
    }
    if (students) {
      teacher.students = await this.studentRepository.findByIds(students);
    }

    return this.teacherRepository.save(teacher);
  }
 */

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { subject, students, ...teacherData } = createTeacherDto;
    const teacher = await this.teacherRepository.create(teacherData);

    if (!subject || !subject.id) {
      throw new NotFoundException('Subject ID not provided');
    }

    const foundSubject = await this.subjectRepository.findOne({
      where: { id: subject.id },
    });

    if (!foundSubject) {
      throw new NotFoundException('Subject not found');
    }

    teacher.subject = foundSubject;

    if (students) {
      teacher.students = await this.studentRepository.findByIds(students);
    }

    return this.teacherRepository.save(teacher);
  }

  findAll() {
    return this.teacherRepository.find({ relations: ['subject', 'students'] });
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne({
      where: { id },
      relations: ['subject', 'students'],
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    const { subject, students, ...teacherData } = updateTeacherDto;
    let teacher = await this.teacherRepository.preload({ id, ...teacherData });//Añadir relations con students y subject

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    if (subject && subject.id) {
      const foundSubject = await this.subjectRepository.findOne({
        where: { id: subject.id },
      });

      if (!foundSubject) {
        throw new NotFoundException(`Subject with ID ${subject.id} not found`);
      }

      teacher.subject = foundSubject;
    }

    if (students) {
      teacher.students = await this.studentRepository.findByIds(students);
    }

    return this.teacherRepository.save(teacher);
  }


  async remove(id: number): Promise<void> {
    try {
      const result = await this.teacherRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Teacher with ID ${id} not found`);
      }
    } catch (error) {
      if (error.code === '23503') {
        throw new BadRequestException(`Cannot delete Teacher with ID ${id} because it is referenced by other records`);
      }
      throw error;
    }
  }
}
