import { Subject } from 'src/modules/subject/entities/subject.entity';
import { Student } from 'src/modules/student/entities/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  evaluationDate: Date;

  @Column()
  evaluationType: string;

  @Column({ nullable: true })
  evaluationGrade: number;

  @ManyToOne(() => Subject, subject => subject.evaluations)
  subject: Subject;

  @ManyToOne(() => Student, student => student.evaluations)
  student: Student;
}
