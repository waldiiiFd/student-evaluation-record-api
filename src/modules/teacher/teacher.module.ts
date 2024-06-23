import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Student } from 'src/student/entities/student.entity';
import { Subject } from 'src/subject/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Student, Subject])],
  providers: [TeacherService],
  controllers: [TeacherController],
})
export class TeacherModule {}
