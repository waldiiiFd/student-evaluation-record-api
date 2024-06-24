import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  name: string;

  @IsArray()
  @IsOptional()
  teachers?: number[];

  @IsArray()
  @IsOptional()
  evaluations?: number[];

  @IsArray()
  @IsOptional()
  students?: number[];
}
