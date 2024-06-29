import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { Evaluation } from './entities/evaluation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/modules/subject/entities/subject.entity';
import { Student } from '../student/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject,Evaluation,Student])],
  controllers: [EvaluationController],
  providers: [EvaluationService],
})
export class EvaluationModule {}
