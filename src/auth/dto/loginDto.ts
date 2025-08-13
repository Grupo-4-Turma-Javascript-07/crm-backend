import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'teste@email.com' })
  email: string;

  @ApiProperty({ example: '123456789Ab@' })
  password: string;
}
