import { Connection, getRepository, getConnection } from "typeorm";
import { Cadeira } from "src/entities/cadeira.entity";
import { Situacao } from "src/enums/cadeira/situacao.enum";

export class CadeiraService{

    constructor(private connection:Connection){}


    async save(cadeira:Cadeira):Promise<Cadeira>{
        return await getRepository(Cadeira).save(cadeira);
    }

    async remove(id:number):Promise<Cadeira>{
        let cadeira:Cadeira = await this.get(id);
        cadeira.situacao = Situacao.INATIVO;
        return await cadeira.save();
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