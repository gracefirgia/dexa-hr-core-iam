import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Handle empty array ([])
        if (Array.isArray(data) && data.length === 0) {
          return {
            statusCode: 200,
            message: 'No data found',
            data: [],
          };
        }

        // Handle null or undefined
        if (data === null || data === undefined) {
          return {
            statusCode: 200,
            message: 'No data found',
            data: null,
          };
        }

        // Default success response
        return {
          statusCode: 200,
          message: 'Request successful',
          data,
        };
      }),
    );
  }
}
