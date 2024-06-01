// facebook.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class FacebookGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Add your logic to check if the user is authenticated via Facebook
    const request = context.switchToHttp().getRequest();
    return request.user && request.user.facebookId;
  }
}
