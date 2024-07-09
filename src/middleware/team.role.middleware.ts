import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TeamRoleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const user = req.user;

        if (user.role !== 'Team' && user.role !== 'Super Admin' && user.role !== 'Admin' && user.role !== 'Content Editor') {
            throw new ForbiddenException('You do not have permission to access this resource');
        }

        next();
    }
}
