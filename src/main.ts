import { AccessGuard } from './common/guards/access.guard';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { loggerMiddleware } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(loggerMiddleware);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new AccessGuard(new Reflector()));
  app.setGlobalPrefix(AppModule.serverPrefix);
  await app.listen(AppModule.serverPort);
  return {
    serverPort: AppModule.serverPort,
    serverPrefix: AppModule.serverPrefix,
  };
}
bootstrap().then(({ serverPort, serverPrefix }) => {
  Logger.log(
    `Application running on: http://localhost:${serverPort}${serverPrefix}`,
    'Main',
  );
});
