import { getRepository, getConnection } from "typeorm";
import { Participante } from "src/entities/participante.entity";
import { Cadeira } from "src/entities/cadeira.entity";
import { ParticipanteRepository } from "src/repositories/participante.repository";
import { ParticipanteValidator } from "src/validators/participante.validator";
import { Injectable } from "@nestjs/common";
import { Lista } from "src/entities/lista.entity";
import { ListaRepository } from "src/repositories/lista.repository";

@Injectable()
export class ParticipanteService{

    constructor(
        private participanteRepository:ParticipanteRepository,
        private participanteValidator:ParticipanteValidator,
        private listaRepository:ListaRepository
    ){}


    async insert(participante:Participante, lista:Lista):Promise<Participante>{
        if(lista){
            await this.participanteValidator.validarTelefoneJaExistente(participante, lista);
            await this.participanteValidator.validarNomeJaExistente(participante, lista);
        }
        else{
            await this.participanteValidator.validarNomeDependenteJaExistente(participante);
        }
        let dependentes = Object.assign([], participante.dependentes);        
        participante = await this.participanteRepository.save(participante);
        participante.dependentes = [];
        if(lista)
            await this.listaRepository.addParticipante(lista, participante);
        for(var dependente of dependentes){
            dependente = await this.insert(dependente, null);
            await this.addDependente(participante, dependente);
            participante.dependentes.push(dependente);
        }
        return participante;
    }

    async update(participante:Participante, lista:Lista):Promise<Participante>{
        if(lista)
            await this.participanteValidator.validarTelefoneJaExistente(participante, lista);
        let dependentes = Object.assign([], participante.dependentes);        
        participante = await this.participanteRepository.save(participante);
        participante.dependentes = dependentes;
        if(lista)
            await this.listaRepository.addParticipante(lista, participante);
            
        return participante;
    }

    async remove(id:number):Promise<Participante>{
        let participante:Participante = await this.get(id);
        for(let dependente of participante.dependentes){
            await this.participanteRepository.remove(dependente.id);
        }


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