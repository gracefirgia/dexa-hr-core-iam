require('dotenv').config();
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.jwt;

    if (!token) throw new UnauthorizedException('No token');

    try {
      if (!process.env.JWT_SECRET) {
        throw new UnauthorizedException('JWT secret is not defined');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        id: string;
        name: string;
        email: string;
        iat: number;
      };
      request.user = decoded;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
