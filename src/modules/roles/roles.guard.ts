import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { UsersService } from '../users/services/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector , private readonly userService:UsersService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // const { user } = context.switchToHttp().getRequest();

    // if (requiredRoles.some((role: ERole) => user.role === role)) return true;
    // throw new ForbiddenException(
    //   'Your role is invalid',
    // );
    const { user } = context.switchToHttp().getRequest();
    const dbUser = await this.userService.findOneUser(user.username);

    // return requiredRoles.some((role) => dbUser.role?.some((r) => r.name == role));
    // return requiredRoles.includes(dbUser.role?)
    return requiredRoles.some((role:ERole) => user.role?.includes(dbUser.role.name));
  }
}