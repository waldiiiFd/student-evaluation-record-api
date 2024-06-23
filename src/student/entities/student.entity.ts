import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';

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

    @Column()
    average: number;
    
    @ManyToMany(() => Teacher, teacher => teacher.students)
    @JoinTable()
    teachers: Teacher[];
}
