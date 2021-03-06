import { Controller, Get, Post, Body, HttpException, HttpStatus, HttpCode, Query, Param, Put, Delete } from '@nestjs/common';
import { ParticipanteService } from 'src/services/participante.service';
import { Participante } from 'src/entities/participante.entity';
import { Cadeira } from 'src/entities/cadeira.entity';
import { ParticipanteLista } from 'src/dtos/participante-lista.dto';

@Controller('participantes')
export class ParticipanteController {
  
  constructor(
    private readonly participanteService: ParticipanteService
  ) {}

  @Post('')
  @HttpCode(200)
  async insert(@Body() participanteLista: ParticipanteLista) {
    return await this.participanteService.insert(participanteLista.participante, participanteLista.lista);
  }

  @Put('')
  @HttpCode(200)
  async update(@Body() participanteLista: ParticipanteLista) {
    return await this.participanteService.update(participanteLista.participante, participanteLista.lista);
  }

  @Put('dependente')
  @HttpCode(200)
  async addDependente(@Body() addDependente: {participante: Participante, dependente:Participante}) {
    return await this.participanteService.addDependente(addDependente.participante, addDependente.dependente);
  }

  @Put('cadeira')
  @HttpCode(200)
  async addCadeira(@Body() addCadeira: {participante: Participante, cadeira:Cadeira}) {
    return await this.participanteService.addCadeira(addCadeira.participante, addCadeira.cadeira);
  }

  @Get('')
  @HttpCode(200)
  async getAll() {
    return await this.participanteService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  async get(@Param('id') id:number) {
    return await this.participanteService.get(id);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id:number) {
    return await this.participanteService.remove(id);
  }

}