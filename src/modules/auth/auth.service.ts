import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { UpdateUserCredentialsDto } from './dto/update-user-credentials.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterDto) {
    const {email, password, role,teacherId } = registerUserDto;

    const hashedPassword = await bcryptjs.hash(password, 10);

    await this.userService.create_user({
      email,
      password: hashedPassword,
      role,
      teacherId,

    });

    return {
      email
    };
  }

  async update_user_credentials(
    email: string,
    updateCredentialsDto: UpdateUserCredentialsDto,
  ) {
    const { current_password, new_password } = updateCredentialsDto;

    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcryptjs.compare(
      current_password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const hashedPassword = await bcryptjs.hash(new_password, 10);

    await this.userService.update_user(email, { new_password: hashedPassword });

    return {
      email,
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { email: user.email, role: user.role };

    const token = await this.jwtService.signAsync(payload);

    return {
      email: user.email,
      role: user.role,
      token: token,
    };
  }

  async get_profile({
    email,
    role
  }: {
    email: string;
    role: Role;
  }): Promise<{ email: string; role: Role }> {
    const user = await this.userService.findOneByEmail(email);
    return { email: user.email, role: user.role };
  }
}
