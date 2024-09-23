import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";
import { Role } from "src/modules/common/enums/role.enum";

export class CreateUserDto {
    @IsEmail()
    email: string;
  
    @IsString()
    password: string;

    @IsString()
    role:Role;

    @IsNumber()
    @IsOptional()
    teacherId:number;
}
