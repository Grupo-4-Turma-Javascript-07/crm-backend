import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioService } from '../service/usuario.service';

@ApiTags('Usuario')
@Controller('/usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }

  @Post('/cadastro')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(usuario);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/desativar/:id')
  @HttpCode(HttpStatus.OK)
  desativar(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.desativar(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('/reativar/:id')
  @HttpCode(HttpStatus.OK)
  reativar(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.reativar(id);
  }
}
