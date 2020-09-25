import { Connection, getRepository } from "typeorm";
import { Lista } from "src/entities/lista.entity";

export class ListaService{

    constructor(private connection:Connection){}


    async save(lista:Lista):Promise<Lista>{
        return await getRepository(Lista).save(lista);
    }

    async get(id:number):Promise<Lista>{
        return await getRepository(Lista).createQueryBuilder('lista')
        .leftJoinAndSelect("lista.participantes", "participantes")
        .where(`lista.id = ${id}`)
        .getOne();
    }

    async getAll():Promise<Array<Lista>>{
        return await getRepository(Lista).createQueryBuilder('lista')
        .leftJoinAndSelect("lista.participantes", "participantes")
        .getMany();
    }

}