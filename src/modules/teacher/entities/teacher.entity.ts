import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany} from 'typeorm';
import { Student } from 'src/modules/student/entities/student.entity';
import { Subject } from 'src/modules/subject/entities/subject.entity';

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Subject, subject => subject.teachers)
    subject: Subject;

    @ManyToMany(() => Student, student => student.teachers)
    students: Student[];
}
