import { Injectable } from '@nestjs/common';
import { CreateStudentTeacherDto } from './dto/create-student_teacher.dto';
import { UpdateStudentTeacherDto } from './dto/update-student_teacher.dto';

@Injectable()
export class StudentTeacherService {
  create(createStudentTeacherDto: CreateStudentTeacherDto) {
    return 'This action adds a new studentTeacher';
  }

  findAll() {
    return `This action returns all studentTeacher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentTeacher`;
  }

  update(id: number, updateStudentTeacherDto: UpdateStudentTeacherDto) {
    return `This action updates a #${id} studentTeacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentTeacher`;
  }
}
