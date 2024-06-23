import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Teacher, teacher => teacher.subject)
    teachers: Teacher[];
}
