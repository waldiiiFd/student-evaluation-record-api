import { Module } from '@nestjs/common';
import { StudentTeacherService } from './student_teacher.service';
import { StudentTeacherController } from './student_teacher.controller';

@Module({
  controllers: [StudentTeacherController],
  providers: [StudentTeacherService],
})
export class StudentTeacherModule {}
