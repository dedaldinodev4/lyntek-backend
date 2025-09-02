import { Controller, Post, Body, Version, Put, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import type { IUpdateCredentials } from './dto/update-credentials-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Version('1')
  login(@Body() data: LoginAuthDto) {
    return this.authService.login(data);
  }

  @Post('register')
  @Version('1')
  register(@Body() data: RegisterAuthDto) {
    return this.authService.register(data);
  }

  @Put('credentials/:id')
  @Version('1')
  updateCredentials(@Param('id') id: string, @Body() data: IUpdateCredentials) {
    return this.authService.updateCredentials(id, data)
  }
}
