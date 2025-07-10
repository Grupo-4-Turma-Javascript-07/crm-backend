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
} from '@nestjs/common';
import { UsuarioService } from './../service/usuario.service';
import { Usuario } from '../entities/usuario.entity';

@Controller('/usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: { email: string; senha: string }): Promise<Usuario> {
    return this.usuarioService.login(body.email, body.senha);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(usuario);
  }

  @Put('/desativar/:id')
  @HttpCode(HttpStatus.OK)
  desativar(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.desativar(id);
  }

  @Put('/reativar/:id')
  @HttpCode(HttpStatus.OK)
  reativar(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return this.usuarioService.reativar(id);
  }
}
