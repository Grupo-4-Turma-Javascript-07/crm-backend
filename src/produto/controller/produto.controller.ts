import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Produto } from '../entities/produto.entity';
import { ProdutoService } from '../services/produto.service';
import { PaginationDto } from '../../dto/pagination.dto';

@ApiTags('Produtos')
@UseGuards(JwtAuthGuard)
@Controller('/produtos')
@ApiBearerAuth()
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() pagination: PaginationDto): Promise<PaginationDto> {
    return this.produtoService.findAll(pagination);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  @Get('oportunidade/:opt')
  @HttpCode(HttpStatus.OK)
  async findByOportunidade(@Param('opt') optParam: string): Promise<Produto[]> {
    const opt = optParam === 'true';
    return this.produtoService.findByOportunidade(opt);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Body() produto: Produto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Produto> {
    return this.produtoService.update(produto, id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.delete(id);
  }
}
