import { Banco } from "src/entities/banco.entity";
import { BancoRepository } from "src/repositories/banco.repository";
import { Injectable, ForbiddenException } from "@nestjs/common";
import { ParticipanteRepository } from "src/repositories/participante.repository";
import { Participante } from "src/entities/participante.entity";
import { TelefoneJaCadastradoException } from "src/exceptions/telefone-ja-cadastrado.exception";
import { Lista } from "src/entities/lista.entity";

@Injectable()
export class ParticipanteValidator{

    constructor(private participanteRepository:ParticipanteRepository){}

    async validarTelefoneJaExistente(participante:Participante, lista:Lista){
        if(participante.telefone && (await this.participanteRepository.verifyTelefone(participante.id, lista.id, participante.telefone)) != null){
            throw new TelefoneJaCadastradoException();
        }
    }
    

}