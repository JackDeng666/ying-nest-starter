import { TestModule } from './modules/test/test.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TestModule],
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
