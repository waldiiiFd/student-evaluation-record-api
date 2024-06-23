import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Subject } from 'src/subject/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Teacher, Subject])],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
