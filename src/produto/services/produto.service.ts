import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { Produto } from '../entities/produto.entity';
import { PaginationDto } from '../../dto/pagination.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private CategoriaService: CategoriaService,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(pagination: PaginationDto) {
    const page = Math.max(1, Number(pagination.page) || 1);
    const rawLimit = Number(pagination.limit) || 10;
    const limit = Math.min(rawLimit, 100);
    const skip = (page - 1) * limit;

    const [data, total] = await this.produtoRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: { categoria: true },
    });

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: {
        id,
      },
      relations: {
        categoria: true,
      },
    });

    if (!produto) throw new NotFoundException('Produto não encontrado!');

    return produto;
  }

  async findByOportunidade(opt: boolean): Promise<Produto[]> {
    return this.produtoRepository.find({
      where: {
        opt,
      },
      relations: {
        categoria: true,
      },
    });
  }

  async create(produto: Produto): Promise<Produto> {
    if (!produto.categoria || !produto.categoria.id) {
      throw new BadRequestException('Categoria obrigatória.');
    }

    const categoria = await this.categoriaRepository.findOne({
      where: { id: produto.categoria.id },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada.');
    }

    if (produto.id) {
      throw new BadRequestException('O ID não pode ser definido manualmente.');
    }

    const produtoExistente = await this.produtoRepository.findOne({
      where: {
        nome: produto.nome,
      },
    });

    if (produtoExistente) {
      throw new ConflictException('Produto já existe!');
    }

    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto, id: number): Promise<Produto> {
    const produtoAntigo = await this.findById(id);

    const novoProduto = {
      ...produtoAntigo,
      ...produto,
    };
    await this.CategoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(novoProduto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.produtoRepository.delete(id);
  }
}
