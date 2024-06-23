import { PartialType } from '@nestjs/mapped-types';
import { CreateEvaluationDto } from './create-evaluation.dto';
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { Subject } from 'src/modules/subject/entities/subject.entity';

export class UpdateEvaluationDto extends PartialType(CreateEvaluationDto) {
    @IsDate()
    @IsNotEmpty()
    evaluationDate: Date;

    @IsString()
    @IsNotEmpty()
    evaluationType: string;//Parcial o Evaluacion sistematica (((Enum)))

    @IsNumber()
    @IsNotEmpty()
    evaluationGrade:number;

    @IsObject()
    @IsNotEmpty()
    subject: Partial<Subject>;
}
