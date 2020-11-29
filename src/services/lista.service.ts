import { Connection, getRepository, getConnection } from "typeorm";
import { Lista } from "src/entities/lista.entity";
import { Participante } from "src/entities/participante.entity";
import { ListaRepository } from "src/repositories/lista.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListaService{

    constructor(private listaRepository:ListaRepository){}

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
        return this.listaRepository.delete(id);
    }

}