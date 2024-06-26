import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ContentRoleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const user = req.user;

        if (user.role !== 'Content Editor' && user.role !== 'Super Admin' && user.role !== 'Admin') {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        next();
    }
}
