import { Connection, getRepository, getConnection } from "typeorm";
import { Participante } from "src/entities/participante.entity";

export class ParticipanteService{

    constructor(private connection:Connection){}


    async save(participante:Participante):Promise<Participante>{
        participante = new Participante(participante);
        return await participante.save();
    }

    async remove(id:number):Promise<Participante>{
        let participante:Participante = await this.get(id);
        return await participante.remove();
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

    async addDependente(participante:Participante, dependente:Participante){
        await getConnection().createQueryBuilder()
        .relation(Participante, "dependentes")
        .of(participante)
        .add(dependente);
    }

}