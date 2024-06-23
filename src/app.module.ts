import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { TeacherModule } from './teacher/teacher.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [StudentModule, SubjectModule, EvaluationModule, TeacherModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
