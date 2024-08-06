import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToOne, JoinColumn } from 'typeorm';
import { Student } from 'src/modules/student/entities/student.entity';
import { Subject } from 'src/modules/subject/entities/subject.entity';
import { User } from 'src/modules/user/entities/user.entity'; // Asegúrate de que la ruta sea correcta

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  identification_number: string;

  @ManyToOne(() => Subject, subject => subject.teachers)
  subject: Subject;

  @ManyToMany(() => Student, student => student.teachers)
  students: Student[];

  @OneToOne(() => User, user => user.teacher) // Relación OneToOne con User
  @JoinColumn() // JoinColumn es necesario en uno de los lados de la relación OneToOne
  user: User;
}
