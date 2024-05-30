import { User } from './user.interface';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: User;
  }
}