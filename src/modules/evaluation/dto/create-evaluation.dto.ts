import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Min, Max, IsInt } from "class-validator";
import { Student } from "src/modules/student/entities/student.entity";
import { Subject } from "src/modules/subject/entities/subject.entity";

export class CreateEvaluationDto {
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @IsNotEmpty()
    evaluationDate: Date;

    @IsString()
    @IsNotEmpty()
    evaluationType: string;

    @IsNumber()
    @IsInt()
    @Min(2)
    @Max(5)
    @IsOptional()
    evaluationGrade: number;

    @IsObject()
    @IsNotEmpty()
    subject: Partial<Subject>;

    @IsObject()
    @IsNotEmpty()
    student: Partial<Student>;
}
