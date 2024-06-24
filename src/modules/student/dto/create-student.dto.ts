import { IsString, IsEmail, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

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
}
