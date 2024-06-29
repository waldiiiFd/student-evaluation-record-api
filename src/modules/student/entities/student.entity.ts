import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Teacher } from 'src/modules/teacher/entities/teacher.entity';
import { Subject } from 'src/modules/subject/entities/subject.entity';
import { Evaluation } from 'src/modules/evaluation/entities/evaluation.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  academicYear: number;

  @Column()
  group: number;

  /* @Column()
    average: number; */

  @ManyToMany(() => Teacher, (teacher) => teacher.students)
  @JoinTable()
  teachers: Teacher[];

  @ManyToMany(() => Subject, (subject) => subject.students)
  @JoinTable()
  subjects: Subject[];

  @OneToMany(() => Evaluation, (evaluation) => evaluation.student)
  evaluations: Evaluation[];
}


