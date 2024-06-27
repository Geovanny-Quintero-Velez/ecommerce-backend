import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends PassportAuthGuard('jwt') {}

@Injectable()
export class RolAuthGuard extends JwtAuthGuard {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        
        const canActivate = super.canActivate(context);
        if (!canActivate) {
          return false;
        }
    
        const roles = this.reflector.get<string[]>('Roles', context.getHandler());
        if (!roles || roles.length === 0) {
          return true;
        }
        
        const request = context.switchToHttp().getRequest();
        const user = request.user;
    
        const allowed = roles.some(role => user.rol === role);

        if (!allowed) {

          throw new UnauthorizedException('You do not have permission to access this resource '+user.rol);
        }
    
        return true;
    }
}