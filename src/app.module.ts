/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './Usuario/entities/usuario.entity';
import { UsuarioModule } from './Usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: 'root',
      password: 'n6mr4tcngw',
      database: process.env.DB_NAME,
      entities: [Usuario],
      synchronize: true,
    }),
    UsuarioModule,
  ],
})
export class AppModule {}
