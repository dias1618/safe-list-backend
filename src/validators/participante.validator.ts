import { Banco } from "src/entities/banco.entity";
import { BancoRepository } from "src/repositories/banco.repository";
import { Injectable, ForbiddenException } from "@nestjs/common";
import { ParticipanteRepository } from "src/repositories/participante.repository";
import { Participante } from "src/entities/participante.entity";
import { TelefoneJaCadastradoException } from "src/exceptions/telefone-ja-cadastrado.exception";
import { Lista } from "src/entities/lista.entity";
import { NomeJaCadastradoException } from "src/exceptions/nome-ja-cadastrado.exception";

@Injectable()
export class ParticipanteValidator{

    constructor(private participanteRepository:ParticipanteRepository){}

    async validarTelefoneJaExistente(participante:Participante, lista:Lista){
        if(participante.telefone && (await this.participanteRepository.verifyTelefone(participante.id, lista.id, participante.telefone)) != null){
            throw new TelefoneJaCadastradoException();
        }
    }

    async validarNomeJaExistente(participante:Participante, lista:Lista){
        if(participante.nome && (await this.participanteRepository.verifyNome(participante.id, lista.id, participante.nome)) != null){
            throw new NomeJaCadastradoException('Participante já cadastrado nessa lista');
        }
    }

    async validarNomeDependenteJaExistente(participante:Participante){
        if(participante.nome && participante.responsavel && (await this.participanteRepository.verifyNomeDependente(participante.id, participante.responsavel.id, participante.nome)) != null){
            throw new NomeJaCadastradoException('Dependente já cadastrado nessa lista');
        }
    }
    

}