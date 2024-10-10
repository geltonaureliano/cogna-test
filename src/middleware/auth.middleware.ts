import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

// Type
export interface AccessTokenPayload {
  userId: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const publicRoutes = ['/auth/login', '/auth/register'];

    // Valid public routes
    if (publicRoutes.includes(req.path)) {
      return next();
    }

    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];

    if (!bearerHeader || !accessToken) {
      return res
        .status(401)
        .json({ message: 'Token missing, please sign in.' });
    }

    try {
      // Validation JWT Token
      await verify(accessToken, process.env.SECRET_KEY);

      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Invalid token, please sign in again.' });
    }
  }
}
