import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/modules/common/enums/role.enum";
import { ROLES_KEY} from "../../common/decorators/roles.decoradors";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    
    /* En caso de que el Rol Admin pueda hacer cualquier operación en el sistema
    if (requiredRoles.includes(Role.Admin)) {
      return true;
    } */
    

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((roles) => user.role.role?.includes(roles)); //return user.role.role === requiredRoles;
    
  }
}
