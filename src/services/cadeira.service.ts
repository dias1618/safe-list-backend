import { Connection, getRepository, getConnection } from "typeorm";
import { Cadeira } from "src/entities/cadeira.entity";

export class CadeiraService{

    constructor(private connection:Connection){}


    async save(cadeira:Cadeira):Promise<Cadeira>{
        return await getRepository(Cadeira).save(cadeira);
    }

    async remove(id:number):Promise<Cadeira>{
        let cadeira:Cadeira = await this.get(id);
        return await cadeira.remove();
    }

    async get(id:number):Promise<Cadeira>{
        return await getRepository(Cadeira).createQueryBuilder('cadeira')
        .where(`cadeira.id = ${id}`)
        .getOne();
    }

    async getAll():Promise<Array<Cadeira>>{
        return await getRepository(Cadeira).createQueryBuilder('cadeira')
        .getMany();
    }

}