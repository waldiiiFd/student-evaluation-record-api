import { Subject } from 'src/subject/entities/subject.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
@Entity()
export class Evaluation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    evaluationDate: Date;

    @Column()
    evaluationType: string;//Parcial o Evaluacion sistematica (((Enum)))

    @Column()
    evaluationGrade:number;

    @ManyToOne(() => Subject, subject => subject.evaluations )
    subject: Subject;

   
    
}
