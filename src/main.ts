import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter'
import { LoggingInterceptor } from './common/interceptors/loggin/loggin.interceptor';
import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //* GlobalFilters *//
  //app.useGlobalFilters(new HttpExceptionFilter());
  //* GlobalInterceptors *//
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor())

  //* GlobalPrefix and Versioning *//
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI
  })

  app.enableCors({
    origin: [
      'http://localhost:3000', // front-end app
      'http://127.0.0.1:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use((req, res, next) => {
    req.user = { roles: ['admin'] }; // 👈 change roles to test
    next();
  });

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
