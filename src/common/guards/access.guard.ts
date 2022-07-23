import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    console.log('Permissions: ', permissions);
    if (!permissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log('headers: ', request.headers.authorization);
    return true;
  }
}
