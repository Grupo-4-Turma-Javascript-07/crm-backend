import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserFromJwtInterface } from '../interfaces/user-from-jwt.interface';
import { UserPayload } from '../interfaces/user-payload.interface';
import { UsuarioService } from '../../usuario/service/usuario.service';
import { LoginDto } from '../dto/loginDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserFromJwtInterface | null> {
    const user = await this.usuarioService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.senha))) {
      const { id, email, nome } = user;
      return { id, email, nome };
    }
    return null;
  }

  async login(user: LoginDto): Promise<{ access_token: string }> {
    const userLogin = await this.validateUser(user.email, user.password);

    if (!userLogin) {
      throw new BadRequestException('email ou senha inválidos');
    }
    const payload: UserPayload = {
      sub: userLogin?.id,
      email: userLogin?.email,
    };

    const token: string = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
