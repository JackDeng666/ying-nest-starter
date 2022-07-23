import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static serverPort: number;
  static serverVersion: string;
  static serverPrefix: string;

  constructor(private readonly configService: ConfigService) {
    AppModule.serverPort = +this.configService.get('SERVER_PORT');
    AppModule.serverVersion = this.configService.get('SERVER_VERSION');
    AppModule.serverPrefix = this.configService.get('SERVER_PREFIX');
  }
}
