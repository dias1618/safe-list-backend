import { Connection, getRepository } from "typeorm";
import { Cadeira } from "src/entities/cadeira.entity";
import { Situacao } from "src/enums/cadeira/situacao.enum";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CadeiraRepository{

    constructor(private connection:Connection){}


    async save(cadeira:Cadeira):Promise<Cadeira>{
        return await getRepository(Cadeira).save(cadeira);
    }

    async get(id:number):Promise<Cadeira>{
        return await getRepository(Cadeira).createQueryBuilder('cadeira')
        .where(`cadeira.id = ${id}`)
        .andWhere(`cadeira.situacao = ${Situacao.ATIVO}`)
        .getOne();
    }

    async getAll():Promise<Array<Cadeira>>{
        return await getRepository(Cadeira).createQueryBuilder('cadeira')
        .where(`cadeira.situacao = ${Situacao.ATIVO}`)
        .getMany();
    }

}