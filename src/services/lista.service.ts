import { Connection, getRepository, getConnection } from "typeorm";
import { Lista } from "src/entities/lista.entity";
import { Participante } from "src/entities/participante.entity";
import { ListaRepository } from "src/repositories/lista.repository";
import { Injectable } from "@nestjs/common";
import { ParticipanteRepository } from "src/repositories/participante.repository";

@Injectable()
export class ListaService{

    constructor(
        private listaRepository:ListaRepository,
        private participanteRepository:ParticipanteRepository
    ){}

    async save(lista:Lista):Promise<Lista>{
        return this.listaRepository.save(lista);
    }

    async get(id:number):Promise<Lista>{
        return this.listaRepository.get(id);
    }

    async getByDate(date:string):Promise<Array<Lista>>{
        return this.listaRepository.getByDate(date);
    }

    async addParticipante(lista:Lista, participante:Participante){
        await this.addParticipante(lista, participante);
    }

    async delete(id:number):Promise<Lista>{
        let lista:Lista = await this.get(id);
        for(let participante of lista.participantes){

            for(let dependente of participante.dependentes){
                await this.participanteRepository.remove(dependente.id);
            }

            await this.participanteRepository.remove(participante.id);
        }

        return this.listaRepository.delete(id);
    }

}