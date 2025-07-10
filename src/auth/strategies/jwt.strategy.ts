import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { UserPayload } from '../interfaces/user-payload.interface';
import { UserFromJwtInterface } from '../interfaces/user-from-jwt.interface';
import { UsuarioService } from '../../usuario/service/usuario.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsuarioService,
  ) {
    const secret = configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new Error(
        'JWT_SECRET não está definido nas variaveis de ambiente ',
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwtInterface> {
    const user = await this.userService.findById(payload.sub);
    return {
      id: user.id,
      email: user.email,
      nome: user.nome,
    };
  }
}
