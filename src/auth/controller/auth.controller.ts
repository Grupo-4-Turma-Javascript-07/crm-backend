import { Body, Controller, Post } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../service/auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/loginDto';

@ApiTags('Usuario')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
