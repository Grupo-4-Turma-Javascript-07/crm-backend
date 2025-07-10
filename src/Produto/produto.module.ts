import { Module } from '@nestjs/common';
import { Produto } from './entities/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './services/produto.service';
import { ProdutoController } from './controller/produto.controller';
import { CategoriaModule } from '../Categoria/categoria.module';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
  providers: [ProdutoService],
  controllers: [ProdutoController],
  exports: [],
})
export class ProdutoModule {}