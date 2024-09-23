import { MinLength, IsEmail, IsString, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { Role } from "src/modules/common/enums/role.enum";

export class RegisterDto {
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    password: string;
    @IsString()
    role:Role;
    @IsOptional()
    @IsNumber()
    teacherId;
}
