import { Controller, Get, Post, Body, HttpException, HttpStatus, HttpCode, Query, Param, Put } from '@nestjs/common';
import { ListaService } from 'src/services/lista.service';
import { Lista } from 'src/entities/lista.entity';
import { Participante } from 'src/entities/participante.entity';

@Controller('listas')
export class ListaController {
  
  constructor(
    private readonly listaService: ListaService
  ) {}

  @Post('')
  @HttpCode(200)
  async insert(@Body() lista: Lista) {
    return await this.listaService.save(lista);
  }

  @Put('')
  @HttpCode(200)
  async update(@Body() lista: Lista) {
    return await this.listaService.save(lista);
  }

  @Put('participante')
  @HttpCode(200)
  async addParticipante(@Body() addParticipante: {lista: Lista, participante:Participante}) {
    return await this.listaService.addParticipante(addParticipante.lista, addParticipante.participante);
  }

  @Get('')
  @HttpCode(200)
  async getByDate(@Query('date') date:string) {
    return await this.listaService.getByDate(date);
  }

  @Get(':id')
  @HttpCode(200)
  async get(@Param('id') id:number) {
    return await this.listaService.get(id);
  }

}