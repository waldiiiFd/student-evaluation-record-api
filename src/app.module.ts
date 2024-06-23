import { Module,ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { TeacherModule } from './teacher/teacher.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'cocoloco02',
      database: 'student-evaluation-record-api',
      synchronize: true,
      autoLoadEntities:true,
    }),
    StudentModule, SubjectModule, EvaluationModule, TeacherModule, UserModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
