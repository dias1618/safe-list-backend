import { Controller, Get, Post, Body, HttpException, HttpStatus, HttpCode, Query, Param, Put } from '@nestjs/common';
import { ParticipanteService } from 'src/services/participante.service';
import { Participante } from 'src/entities/participante.entity';

@Controller('participantes')
export class ParticipanteController {
  
  constructor(
    private readonly participanteService: ParticipanteService
  ) {}

  @Post('')
  @HttpCode(200)
  async insert(@Body() participante: Participante) {
    return await this.participanteService.save(participante);
  }

  @Put('')
  @HttpCode(200)
  async update(@Body() participante: Participante) {
    return await this.participanteService.save(participante);
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

}