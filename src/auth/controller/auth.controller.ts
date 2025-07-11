import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserFromJwtInterface } from '../interfaces/user-from-jwt.interface';
import { AuthService } from '../service/auth.service';
import { ApiTags } from '@nestjs/swagger';

interface AuthRequest extends Request {
  user: UserFromJwtInterface;
}

@ApiTags('Usuario')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
