import { Connection, getRepository, getConnection } from "typeorm";
import { Lista } from "src/entities/lista.entity";
import { Participante } from "src/entities/participante.entity";

export class ListaService{

    constructor(private connection:Connection){}


    async save(lista:Lista):Promise<Lista>{
        return await getRepository(Lista).save(lista);
    }

    async get(id:number):Promise<Lista>{
        return await getRepository(Lista).createQueryBuilder('lista')
        .leftJoinAndSelect("lista.participantes", "participantes")
        .leftJoinAndSelect("participantes.dependentes", "dependentes")
        .where(`lista.id = ${id}`)
        .getOne();
    }

    async getAll():Promise<Array<Lista>>{
        return await getRepository(Lista).createQueryBuilder('lista')
        .leftJoinAndSelect("lista.participantes", "participantes")
        .getMany();
    }

    async addParticipante(lista:Lista, participante:Participante){
        await getConnection().createQueryBuilder()
        .relation(Lista, "participantes")
        .of(lista)
        .add(participante);
    }

}