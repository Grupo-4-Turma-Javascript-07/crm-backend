import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserFromJwtInterface } from '../interfaces/user-from-jwt.interface';
import { UserPayload } from '../interfaces/user-payload.interface';
import { UsuarioService } from '../../usuario/service/usuario.service';

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

  async login(user: UserFromJwtInterface): Promise<{ access_token: string }> {
    const payload: UserPayload = { sub: user.id, email: user.email };

    const token: string = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
