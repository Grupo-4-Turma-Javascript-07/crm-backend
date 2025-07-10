import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Categoria } from '../entities/categoria.entity';
import { CategoriaService } from '../services/categoria.service';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) { }

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get('nome')
  findByName(@Query('nome') nome: string): Promise<Categoria[]> {
    return this.categoriaService.findByName(nome);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return this.categoriaService.findById(id);
  }

  @Post()
  create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoria: Categoria,
  ): Promise<Categoria> {
    return this.categoriaService.update(id, categoria);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoriaService.delete(id);
  }
}