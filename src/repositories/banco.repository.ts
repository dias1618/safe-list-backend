import { Connection, getRepository, getConnection } from "typeorm";
import { Banco } from "src/entities/banco.entity";
import { Situacao as SituacaoBanco } from "src/enums/banco/situacao.enum";
import { Situacao as SituacaoCadeira } from "src/enums/cadeira/situacao.enum";
import { Cadeira } from "src/entities/cadeira.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BancoRepository{

    constructor(){}

    async save(banco:Banco):Promise<Banco>{
        return await getRepository(Banco).save(banco);
    }

    async get(id:number):Promise<Banco>{
        return await getRepository(Banco).createQueryBuilder('banco')
        .leftJoinAndSelect("banco.cadeiras", "cadeiras")
        .where(`banco.id = ${id}`)
        .andWhere(`banco.situacao = ${SituacaoBanco.ATIVO}`)
        .getOne();
    }

    async getByIdentificacao(identificacao:string):Promise<Banco>{
        return await getRepository(Banco).createQueryBuilder('banco')
        .where(`banco.identificacao = :identificacao`, {identificacao: identificacao})
        .andWhere(`banco.situacao = ${SituacaoBanco.ATIVO}`)
        .getOne();
    }

    async getAll():Promise<Array<Banco>>{
        return await getRepository(Banco).createQueryBuilder('banco')
        .leftJoinAndSelect("banco.cadeiras", "cadeiras")
        .where(`banco.situacao = ${SituacaoBanco.ATIVO}`)
        .getMany();
    }

    async add(banco:Banco, cadeira:Cadeira){
        await getConnection().createQueryBuilder()
        .relation(Banco, "cadeiras")
        .of(banco)
        .add(cadeira);
    }
    
}