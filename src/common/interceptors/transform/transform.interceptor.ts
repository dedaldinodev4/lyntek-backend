import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const request = context.switchToHttp().getRequest();
        if (response && response.data && response.paginator) {
          return {
            success: true,
            message: response.message || 'Data retrieved successfully',
            data: response.data,
            paginator: response.paginator,
            timestamp: new Date().toISOString(),
            path: request.url,
          };
        }

        return {
          success: true,
          message: response?.message || 'Request successful',
          data: response?.data ?? response,
          timestamp: new Date().toISOString(),
          path: request.url,
        };
      }),
    );
  }
}
