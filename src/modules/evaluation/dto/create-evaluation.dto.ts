
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { Subject } from "src/modules/subject/entities/subject.entity";

export class CreateEvaluationDto {
    @IsDate()
    @IsNotEmpty()
    evaluationDate: Date;

    @IsString()
    @IsNotEmpty()
    evaluationType: string;

    @IsNumber()
    @IsNotEmpty()
    evaluationGrade:number;

    @IsObject()
    @IsNotEmpty()
    subject: Partial<Subject>;
}
