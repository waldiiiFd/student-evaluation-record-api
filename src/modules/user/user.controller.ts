import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./entities";

import { CreateUserDto, UpdateUserDto,/*  UpdateUserRoleDto  */} from "./dto";
import { Role } from "../common/enums/role.enum";
import { Roles } from "../common/decorators/roles.decoradors";
import { Auth } from "../common/decorators/auth.decorador";

@Auth([Role.ADMIN])
@UsePipes(new ValidationPipe())
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create_user(@Body() user: CreateUserDto) {
    return this.userService.create_user(user);
  }

  @Get()
  get_users(): Promise<User[]> {
    return this.userService.get_users();
  }

  @Get(":id")
  get_user(@Param("id") id: number): Promise<User> {
    return this.userService.get_user(id);
  }

  @Get("email/:email")
  findOneByEmail(@Param("email") email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Post(":email")
  updateUser(
    @Param("email") email: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update_user(email, updateUserDto);
  }

  /* @Auth([Role.ADMIN])
  @Post("role/:id")
  update_user_role(
    @Param("id") id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto
  ) {
    return this.userService.update_user_role(id, updateUserRoleDto);
  }
 */
  @Delete(":email")
  delete_user(@Param("email") email: string): Promise<void> {
    return this.userService.delete_user(email);
  }
}
