import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminRoleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const user = req.user;

        if (user.role !== 'Admin' && user.role !== 'Super Admin') {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        next();
    }
}
