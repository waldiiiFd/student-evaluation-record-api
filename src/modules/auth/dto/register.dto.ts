import { MinLength, IsEmail, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { Role } from "src/modules/common/enums/role.enum";

export class RegisterDto {
    @IsString()
    @MinLength(1)
    name:string

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    password: string;

    @IsString()
    role:Role;
}
