import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Teacher } from 'src/modules/teacher/entities/teacher.entity'; // Asegúrate de que la ruta sea correcta
import { Role } from 'src/modules/common/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  role: Role;

  @OneToOne(() => Teacher, teacher => teacher.user)
  @JoinColumn() 
  teacher: Teacher;
}
