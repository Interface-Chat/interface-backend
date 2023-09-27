import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole } from '../../roles/role.enum';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';
import { UsersService } from '../../users/services/users.service';
import { RoleService } from 'src/modules/roles/services/role.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';

// import jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) // private readonly roleService:RoleService,
  {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredRoles);
    if (requiredRoles) {
      const request = context.switchToHttp().getRequest();
      const token: string = request.headers?.authorization?.split('Bearer ')[1];
      try {
        const payload = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        });
        console.log(payload);
        if (!payload) return false;
        if (!requiredRoles.includes(payload.payload.roles.name)) return false;
        return true;
      } catch (err) {
        if (err && err.message) {
          if (err.message.includes('jwt expired')) {
            throw new UnauthorizedException('Token has been expired');
          } else if (err.message.includes('jwt must be provided')) {
            throw new UnauthorizedException('Token must be provided');
          } else if (err.message.includes('jwt malformed')) {
            throw new UnauthorizedException('Token is invalid');
          }
        }
        return false;
      }

    }

    
  }
}
