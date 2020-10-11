import { Connection, getRepository, getConnection } from "typeorm";
import { Participante } from "src/entities/participante.entity";
import { Cadeira } from "src/entities/cadeira.entity";

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
        .leftJoinAndSelect("participante.cadeiras", "cadeiras")
        .where(`participante.id = ${id}`)
        .getOne();
    }

    async getAll():Promise<Array<Participante>>{
        return await getRepository(Participante).createQueryBuilder('participante')
        .leftJoinAndSelect("participante.dependentes", "dependentes")
        .leftJoinAndSelect("participante.cadeiras", "cadeiras")
        .getMany();
    }

    async addDependente(participante:Participante, dependente:Participante){
        await getConnection().createQueryBuilder()
        .relation(Participante, "dependentes")
        .of(participante)
        .add(dependente);
    }

    async addCadeira(participante:Participante, cadeira:Cadeira){
        await getConnection().createQueryBuilder()
        .relation(Participante, "cadeiras")
        .of(participante)
        .add(cadeira);
    }

}