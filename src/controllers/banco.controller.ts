import { Controller, Get, Post, Body, HttpException, HttpStatus, HttpCode, Query, Param, Put, Delete } from '@nestjs/common';
import { BancoService } from 'src/services/banco.service';
import { Banco } from 'src/entities/banco.entity';
import { Cadeira } from 'src/entities/cadeira.entity';

@Controller('bancos')
export class BancoController {
  
  constructor(
    private readonly bancoService: BancoService
  ) {}

  @Post('many')
  @HttpCode(200)
  async saveMany(@Body() saveMany: {quantidade:number}) {
    return await this.bancoService.saveMany(saveMany.quantidade);
  }

  @Post('')
  @HttpCode(200)
  async insert(@Body() banco: Banco) {
    return await this.bancoService.save(banco);
  }

  @Put('')
  @HttpCode(200)
  async update(@Body() banco: Banco) {
    return await this.bancoService.save(banco);
  }

  @Get('')
  @HttpCode(200)
  async getAll() {
    return await this.bancoService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  async get(@Param('id') id:number) {
    return await this.bancoService.get(id);
  }

  @Put('cadeira')
  @HttpCode(200)
  async addCadeira(@Body() addCadeira: {banco: Banco, cadeira:Cadeira}) {
    return await this.bancoService.addCadeira(addCadeira.banco, addCadeira.cadeira);
  }

  @Delete('')
  @HttpCode(200)
  async deleteAll() {
    return await this.bancoService.removeAll();
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id:number) {
    return await this.bancoService.remove(id);
  }

}