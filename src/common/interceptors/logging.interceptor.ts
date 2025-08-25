
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { RabbitMqService } from 'src/rabbit_mq/rabbit_mq.service';
import { CreateLogDto } from '../dto/create-logging.dto';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly rabbitMqService: RabbitMqService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap((responseBody) => {
        // Only POST/PATCH
        if (!['POST', 'PATCH'].includes(req.method)) return;

        const log: CreateLogDto = {
          requester_id: (req.user as any)?.id || 'anonymous', // depends on your auth; use correct property or update User type
          service: 'trx',
          endpoint: req.originalUrl,
          method: req.method,
          request: req.body,
          response: responseBody,
          response_code: res.statusCode.toString(),
          response_status: res.statusMessage,
          latency: Date.now() - now,
        };

        this.rabbitMqService.emit('trx.log', log);
      }),
    );
  }
}
