import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Produto } from '../../produto/entities/produto.entity';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isProduction = this.config.get('NODE_ENV') === 'production';

    return {
      type: this.config.get<'postgres' | 'mysql'>('DB_TYPE') ?? 'postgres',
      host: this.config.get<string>('DB_HOST') ?? 'localhost',
      port: parseInt(this.config.get('DB_PORT') ?? '5432', 10),
      username: this.config.get<string>('DB_USERNAME') ?? 'postgres',
      password: this.config.get<string>('DB_PASSWORD') ?? '',
      database: this.config.get<string>('DB_NAME') ?? 'postgres',
      entities: [Usuario, Produto, Categoria],
      synchronize: false,

      ssl: isProduction,
      extra: isProduction
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {},
    };
  }
}
