import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsString()
  identification_number: string;

  @IsNumber()
  academicYear: number;

  @IsNumber()
  group: number;

  @IsArray()
  @IsOptional()
  teachers?: number[];

  @IsArray()
  @IsOptional()
  subjects?: number[];

  @IsArray()
  @IsOptional()
  evaluations?: number[];
}
