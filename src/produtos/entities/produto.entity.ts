import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Categoria } from './categoria';
import { Usuario } from './usuario';

@Entity({ name: 'tb_produtos' })
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  preco: number;

  @IsNotEmpty()
  @IsNumber()
  @Column('int', { nullable: false })
  estoque: number;

  @IsNotEmpty()
  @IsBoolean()
  @Column('tinyint', { width: 1, nullable: false })
  opt: boolean;

  @IsNotEmpty()
  @Column()
  categoria_id: number;

  @IsNotEmpty()
  @Column()
  usuario_id: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;

  @ManyToOne(() => Usuario, (usuario) => usuario.id, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
