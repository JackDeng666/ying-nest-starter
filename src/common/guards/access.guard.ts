import { User } from './../../modules/user/user.model';
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
    const needToken = this.reflector.get<boolean>('token', handler);
    const permissions = this.reflector.get<string[]>('permissions', handler);
    console.log('needToken: ', needToken);
    console.log('permissions: ', permissions);
    if (!needToken && !permissions) {
      return true;
    }
    if (needToken || permissions) {
      const request = context.switchToHttp().getRequest();
      const { iat, exp, ...user } = this.authService.verify(
        request.headers.token,
      );
      request.user = user;
    }
    if (permissions) {
      console.log('需要权限');
      return true;
    }
    return true;
  }
}
