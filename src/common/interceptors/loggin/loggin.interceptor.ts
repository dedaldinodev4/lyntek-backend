import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    console.log(`Handling request: [${req.method}] ${req.url}`);

    return next.handle().pipe(
      tap(() =>
        console.log(
          `Completed request: [${req.method}] ${req.url} in ${Date.now() - now}ms`,
        ),
      ),
    );
  }
}
