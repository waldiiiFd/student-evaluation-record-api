import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Req,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
  } from "@nestjs/common";

  import { LoginDto } from "./dto/login.dto";
  import { RegisterDto } from "./dto/register.dto";
  import { AuthService } from "./auth.service";
  import { UpdateUserCredentialsDto } from "./dto/update-user-credentials.dto";
  import { Role } from "../common/enums/role.enum";
  import { Auth } from "../common/decorators/auth.decorador";
  import { ActiveUser } from "../common/decorators/active-user.decorator";
  import { UserInterface } from "../common/interfaces/user.interface";
  
  @UsePipes(new ValidationPipe())
  @Controller("auth")
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post("register")
    register(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
    }
  
    @Patch(":email")
    updateUserCredentials(
      @Param("email") email: string,
      @Body() updateCredentialsDto: UpdateUserCredentialsDto
    ) {
      return this.authService.update_user_credentials(
        email,
        updateCredentialsDto
      );
    }
  
    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto);
    }
  
    @Auth([Role.ADMIN]) // Para cualquier endpoint hace falta copiar este decoreador para garantizar la autorización
    @Get("profile")
    get_profile(@ActiveUser() user: UserInterface) {
      return this.authService.get_profile({email: user.email, role: user.role,});
    }
  }
  