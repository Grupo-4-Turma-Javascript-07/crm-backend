import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';

@Entity({ name: 'tb_categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
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
  nome: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];
}
