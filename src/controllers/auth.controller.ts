import { Controller, Get, Post, Body, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { LoginDto } from 'src/dtos/login.dto';
import { UsuarioNaoCadastradoException } from 'src/exceptions/usuario-nao-cadastrado.exception';
import { Usuario } from 'src/entities/usuario.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const usuario = await this.usuarioService.login(loginDto);

    if(!usuario)
        throw new UsuarioNaoCadastradoException();

    return usuario;
  }

  
  @Post('signup')
  @HttpCode(200)
  async createUsuario(@Body() usuario:Usuario) {
      return await this.usuarioService.create(usuario);
  }
}