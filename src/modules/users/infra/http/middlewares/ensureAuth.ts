import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Not found', 404);
  }

  const [, token] = authHeader.split(' ');

  const { secret } = authConfig.jwt;
  const decoded = verify(token, secret);
  const { sub } = decoded as ITokenPayload;

  req.user = {
    id: sub,
  };

  return next();
}
