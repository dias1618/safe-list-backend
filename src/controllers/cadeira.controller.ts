import { Controller, Get, Post, Body, HttpException, HttpStatus, HttpCode, Query, Param, Put, Delete } from '@nestjs/common';
import { CadeiraService } from 'src/services/cadeira.service';
import { Cadeira } from 'src/entities/cadeira.entity';

@Controller('cadeiras')
export class CadeiraController {
  
  constructor(
    private readonly cadeiraService: CadeiraService
  ) {}

  @Post('')
  @HttpCode(200)
  async insert(@Body() cadeira: Cadeira) {
    return await this.cadeiraService.save(cadeira);
  }

  @Put('')
  @HttpCode(200)
  async update(@Body() cadeira: Cadeira) {
    return await this.cadeiraService.save(cadeira);
  }

  @Get('')
  @HttpCode(200)
  async getAll() {
    return await this.cadeiraService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  async get(@Param('id') id:number) {
    return await this.cadeiraService.get(id);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id:number) {
    return await this.cadeiraService.remove(id);
  }

}