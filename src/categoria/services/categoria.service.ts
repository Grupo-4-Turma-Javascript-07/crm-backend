import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not, Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: {
        produtos: true,
      },
    });
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: {
        id,
      },
      relations: {
        produtos: true,
      },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoria com id ${id} não encontrada`);
    }

    return categoria;
  }

  async findByName(nome: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: {
        produtos: true,
      },
    });
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async update(id: number, categoria: Categoria): Promise<Categoria> {
    const categoriaExistente = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoriaExistente) {
      throw new NotFoundException('Categoria não encontrada!');
    }

    const categoriaComMesmoNome = await this.categoriaRepository.findOne({
      where: {
        nome: categoria.nome,
        id: Not(id),
      },
    });

    if (categoriaComMesmoNome) {
      throw new ConflictException('Já existe outra categoria com esse nome!');
    }

    return await this.categoriaRepository.save({
      ...categoriaExistente,
      ...categoria,
      id: categoriaExistente.id,
    });
  }

  async delete(id: number): Promise<void> {
    const categoria = await this.findById(id);
    await this.categoriaRepository.delete(categoria.id);
  }
}
