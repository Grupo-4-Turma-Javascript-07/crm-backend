import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_produtos', schema: 'crm_app' })
export class Produto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  preco: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Column('int', { nullable: false })
  estoque: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Column({ width: 1, nullable: false, type: 'boolean' })
  opt: boolean;

  @ApiProperty({ type: () => Categoria })
  @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
    onDelete: 'CASCADE',
  })
  categoria: Categoria;

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.produto, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
