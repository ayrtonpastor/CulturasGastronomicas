import { Injectable,CanActivate,ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
//import { UserService } from "../user/user.service";
import { Role } from "../../roles/role.enum";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector,
      
      ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requireRoles = this.reflector.getAllAndOverride<Role[]>("roles", [
            context.getHandler(),
            context.getClass(),
          ]);
        console.log(requireRoles)
        if (!requireRoles){
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        
        return requireRoles.some((role) => user.roles.includes(role));
    }
}