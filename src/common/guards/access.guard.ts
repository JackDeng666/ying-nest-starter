import { AuthService } from '../../modules/auth/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const isNoToken = this.reflector.get<boolean>('noToken', handler);
    const permissions = this.reflector.get<string[]>('permissions', handler);
    console.log('isNoToken: ', isNoToken);
    console.log('permissions: ', permissions);
    if (isNoToken && !permissions) {
      return true;
    }
    if (!isNoToken || permissions) {
      const request = context.switchToHttp().getRequest();
      request.user = this.authService.verify(request.headers.token);
    }
    if (permissions) {
      console.log('需要权限');
      return true;
    }
    return true;
  }
}
