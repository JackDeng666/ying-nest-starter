import { User } from './modules/user/user.model';
// import { TasksModule } from './modules/tasks/tasks.module';
// import { ScheduleModule } from '@nestjs/schedule';
import { TestModule } from './modules/test/test.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        define: {
          timestamps: false,
        },
        models: [User],
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    // ScheduleModule.forRoot(),
    TestModule,
    // TasksModule
  ],
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
