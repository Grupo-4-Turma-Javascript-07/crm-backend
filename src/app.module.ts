import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProd = config.get<string>('NODE_ENV') === 'production';

        return isProd
          ? {
              type: 'postgres',
              url: config.get<string>('DATABASE_URL'),
              ssl: { rejectUnauthorized: false },
              autoLoadEntities: true,
              synchronize: true, // cuidado em prod
            }
          : {
              type: config.get<'postgres' | 'mysql'>('DB_TYPE'),
              host: config.get<string>('DB_HOST'),
              port: config.get<number>('DB_PORT'),
              username: config.get<string>('DB_USERNAME'),
              password: config.get<string>('DB_PASSWORD'),
              database: config.get<string>('DB_NAME'),
              autoLoadEntities: true,
              synchronize: true,
            };
      },
    }),
  ],
})
export class AppModule {}
