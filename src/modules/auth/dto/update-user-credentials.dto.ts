import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  current_password: string;

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  new_password: string;
}
