import { Module,ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './modules/student/student.module';
import { SubjectModule } from './modules/subject/subject.module';
import { EvaluationModule } from './modules/evaluation/evaluation.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { UserModule } from './modules/user/user.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';


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
    StudentModule, SubjectModule, EvaluationModule, TeacherModule, UserModule,AuthModule],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
