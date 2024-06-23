
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { Subject } from "src/subject/entities/subject.entity";

export class CreateEvaluationDto {
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
