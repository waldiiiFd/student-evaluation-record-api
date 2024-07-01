import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateTeacherDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  subject?: number;

  @IsArray()
  @IsOptional()
  students?: number[];
}
