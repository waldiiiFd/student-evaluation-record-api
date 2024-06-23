import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentSubjectDto } from './create-student_subject.dto';

export class UpdateStudentSubjectDto extends PartialType(CreateStudentSubjectDto) {}
