import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';

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
    UsuarioModule,
    CategoriaModule,
    ProdutoModule,
    AuthModule,
  ],
})
export class AppModule {}
