import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Teacher } from 'src/modules/teacher/entities/teacher.entity';
import { Subject } from 'src/modules/subject/entities/subject.entity';
import { Evaluation } from '../evaluation/entities/evaluation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Teacher, Subject,Evaluation])],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
