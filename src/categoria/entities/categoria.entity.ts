import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty({ message: 'O nome da categoria é obrigatório.' })
  @IsString({ message: 'O nome da categoria deve ser um texto.' })
  @MinLength(3, {
    message: 'O nome da categoria deve ter pelo menos 3 caracteres.',
  })
  @MaxLength(100, {
    message: 'O nome da categoria ultrapassou o limite permitido.',
  })
  @Column({ length: 100, nullable: false })
  @ApiProperty()
  nome: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
