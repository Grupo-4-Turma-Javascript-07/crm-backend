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
      url: this.config.get<string>('DB_URL'),
      entities: [Usuario, Produto, Categoria],
      synchronize: true,

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
