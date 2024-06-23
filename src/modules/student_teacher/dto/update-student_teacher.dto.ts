import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentTeacherDto } from './create-student_teacher.dto';

export class UpdateStudentTeacherDto extends PartialType(CreateStudentTeacherDto) {}
