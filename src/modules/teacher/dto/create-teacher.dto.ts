import { IsString, IsOptional, IsArray, IsObject, IsNotEmpty } from 'class-validator';
import { Subject } from 'src/modules/subject/entities/subject.entity';

export class CreateTeacherDto {
  @IsString()
  name: string;

  @IsString()
  identification_number: string;

  @IsObject()
  @IsNotEmpty()
  subject: Partial<Subject>;

  @IsArray()
  @IsOptional()
  students?: number[];
}
