import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { UserFromJwtInterface } from '../interfaces/user-from-jwt.interface';
import { Request } from 'express';

interface AuthRequest extends Request {
  user: UserFromJwtInterface;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
