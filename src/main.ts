import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
