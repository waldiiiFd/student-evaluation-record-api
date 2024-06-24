import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { Teacher } from '../teacher/entities/teacher.entity';
import { Student } from '../student/entities/student.entity';
import { Evaluation } from '../evaluation/entities/evaluation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject,Teacher,Student,Evaluation])],
  providers: [SubjectService],
  controllers: [SubjectController],
})
export class SubjectModule {}
