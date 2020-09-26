import { Connection, getRepository } from "typeorm";
import { Participante } from "src/entities/participante.entity";

export class ParticipanteService{

    constructor(private connection:Connection){}


    async save(participante:Participante):Promise<Participante>{
        participante = new Participante(participante);
        return await participante.save();
    }

    async get(id:number):Promise<Participante>{
        return await getRepository(Participante).createQueryBuilder('participante')
        .leftJoinAndSelect("participante.dependentes", "dependentes")
        .where(`participante.id = ${id}`)
        .getOne();
    }

    async getAll():Promise<Array<Participante>>{
        return await getRepository(Participante).createQueryBuilder('participante')
        .leftJoinAndSelect("participante.dependentes", "dependentes")
        .getMany();
    }

}