import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import { RolesGuard } from 'src/common/guards/roles.guard';


@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, PrismaService, RolesGuard]
})
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CategoriesController)
  }
}
