import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { AuthenticatedUser } from '../decorators/current-user.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!required?.length) return true;

    const { user } = context.switchToHttp().getRequest();
    const authUser = user as AuthenticatedUser;

    if (!authUser?.permissions) {
      throw new ForbiddenException('Insufficient permissions');
    }

    const hasPermission = required.some((p) =>
      authUser.permissions.includes(p) || authUser.permissions.includes('admin:full'),
    );

    if (!hasPermission) {
      throw new ForbiddenException(`Required permission: ${required.join(' or ')}`);
    }

    return true;
  }
}
