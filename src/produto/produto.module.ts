import { Module } from '@nestjs/common';
import { Produto } from './entities/produto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './services/produto.service';
import { ProdutoController } from './controller/produto.controller';
import { CategoriaModule } from '../categoria/categoria.module';
import { Categoria } from '../categoria/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Categoria]), CategoriaModule],
  providers: [ProdutoService],
  controllers: [ProdutoController],
  exports: [],
})
export class ProdutoModule {}
