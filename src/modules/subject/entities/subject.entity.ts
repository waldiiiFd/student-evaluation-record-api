import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Teacher } from 'src/modules/teacher/entities/teacher.entity';
import { Evaluation } from 'src/modules/evaluation/entities/evaluation.entity';
import { Student } from 'src/modules/student/entities/student.entity';

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Teacher, teacher => teacher.subject)
    teachers: Teacher[];

    @OneToMany(() => Evaluation, evaluation => evaluation.subject)
    evaluations: Evaluation[];

    @ManyToMany(() => Student, student => student.subjects)
    students: Student[];
}
