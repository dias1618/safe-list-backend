import { Connection, getRepository, getConnection } from "typeorm";
import { Banco } from "src/entities/banco.entity";
import { Cadeira } from "src/entities/cadeira.entity";

export class BancoService{

    constructor(private connection:Connection){}


    async save(banco:Banco):Promise<Banco>{
        return await getRepository(Banco).save(banco);
    }

    async get(id:number):Promise<Banco>{
        return await getRepository(Banco).createQueryBuilder('banco')
        .leftJoinAndSelect("banco.cadeiras", "cadeiras")
        .where(`banco.id = ${id}`)
        .getOne();
    }

    async getAll():Promise<Array<Banco>>{
        return await getRepository(Banco).createQueryBuilder('banco')
        .leftJoinAndSelect("banco.cadeiras", "cadeiras")
        .getMany();
    }

    async addCadeira(banco:Banco, cadeira:Cadeira){
        await getConnection().createQueryBuilder()
        .relation(Banco, "cadeiras")
        .of(banco)
        .add(cadeira);
    }

}