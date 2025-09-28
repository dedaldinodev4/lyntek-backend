import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter'
import { LoggingInterceptor } from './common/interceptors/loggin/loggin.interceptor';
import { TransformInterceptor } from './common/interceptors/transform/transform.interceptor';
import { VersioningType } from '@nestjs/common';
import path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import serveIndex from 'serve-index'
import express from 'express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //* GlobalFilters *//
  app.useGlobalFilters(new HttpExceptionFilter());
  //* GlobalInterceptors *//
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor())

  //* GlobalPrefix and Versioning *//
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI
  })

  app.enableCors({
    origin: [
      'http://localhost:3000',// front-end app
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use((req, res, next) => {
    req.user = { roles: ['admin'] };
    next();
  });

  app.use('/uploads', express.static('public/uploads'));
  app.use('/ftp', express.static('public/uploads'), serveIndex('public/uploads', { icons: true }));

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
