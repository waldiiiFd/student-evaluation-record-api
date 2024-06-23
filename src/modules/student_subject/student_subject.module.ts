import { Module } from '@nestjs/common';
import { StudentSubjectService } from './student_subject.service';
import { StudentSubjectController } from './student_subject.controller';

@Module({
  controllers: [StudentSubjectController],
  providers: [StudentSubjectService],
})
export class StudentSubjectModule {}
