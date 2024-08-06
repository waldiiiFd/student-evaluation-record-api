import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../enums/role.enum";
import { AuthGuard } from "../../auth/guard/auth.guard";
import { RolesGuard } from "../../auth/guard/roles.guard";
import { Roles } from "./roles.decoradors";

export function Auth(role: Role[]) {
  return applyDecorators(Roles(...role), UseGuards(AuthGuard, RolesGuard));
}
