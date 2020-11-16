import { Banco } from "src/entities/banco.entity";
import { BancoRepository } from "src/repositories/banco.repository";
import { Injectable, ForbiddenException } from "@nestjs/common";
import { ParticipanteRepository } from "src/repositories/participante.repository";
import { Participante } from "src/entities/participante.entity";
import { TelefoneJaCadastradoException } from "src/exceptions/telefone-ja-cadastrado.exception";

@Injectable()
export class ParticipanteValidator{

    constructor(private participanteRepository:ParticipanteRepository){}

    async validate(participante:Participante){
        await this.validarTelefoneJaExistente(participante);
    }

    private async validarTelefoneJaExistente(participante:Participante){
        if(participante.telefone && (await this.participanteRepository.verifyTelefone(participante.id, participante.lista.id, participante.telefone)) != null){
            throw new TelefoneJaCadastradoException();
        }
    }
    

}