import { getRepository, getConnection } from "typeorm";
import { Participante } from "src/entities/participante.entity";
import { Cadeira } from "src/entities/cadeira.entity";
import { ParticipanteRepository } from "src/repositories/participante.repository";
import { ParticipanteValidator } from "src/validators/participante.validator";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ParticipanteService{

    constructor(
        private participanteRepository:ParticipanteRepository,
        private participanteValidator:ParticipanteValidator
    ){}


    async save(participante:Participante):Promise<Participante>{
        await this.participanteValidator.validate(participante);
        return await this.participanteRepository.save(participante);
    }

    async remove(id:number):Promise<Participante>{
        return await this.participanteRepository.remove(id);
    }

    async get(id:number):Promise<Participante>{
        return await this.participanteRepository.get(id);
    }

    async getAll():Promise<Array<Participante>>{
        return await this.participanteRepository.getAll();
    }

    async addDependente(participante:Participante, dependente:Participante){
        return await this.participanteRepository.addDependente(participante, dependente);
    }

    async addCadeira(participante:Participante, cadeira:Cadeira){
        return await this.participanteRepository.addCadeira(participante, cadeira);
    }

}