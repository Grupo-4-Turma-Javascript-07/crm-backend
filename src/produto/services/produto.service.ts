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

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private CategoriaService: CategoriaService,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
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

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);

    await this.CategoriaService.findById(produto.categoria.id);

    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.produtoRepository.delete(id);
  }
}
