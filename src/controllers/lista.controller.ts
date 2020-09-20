import { Controller, Get, Post, Body, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { ListaService } from 'src/services/lista.service';
import { Lista } from 'src/entities/lista.entity';

@Controller('listas')
export class ListaController {
  
  constructor(
    private readonly listaService: ListaService
  ) {}

  @Post('')
  @HttpCode(200)
  async login(@Body() lista: Lista) {
    return await this.listaService.save(lista);
  }

  @Get('')
  @HttpCode(200)
  async getAll() {
    return await this.listaService.getAll();
  }

}