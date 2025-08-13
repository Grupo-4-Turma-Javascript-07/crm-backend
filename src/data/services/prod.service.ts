import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isProduction = this.config.get('NODE_ENV') === 'production';

    return {
      type: 'postgres',
      url: this.config.get<string>('DB_URL'),
      logging: false,
      dropSchema: false,
      ssl: isProduction,
      extra: isProduction
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {},
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
