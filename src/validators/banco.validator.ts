import { Banco } from "src/entities/banco.entity";
import { BancoRepository } from "src/repositories/banco.repository";
import { Injectable, ForbiddenException } from "@nestjs/common";

@Injectable()
export class BancoValidator{

    constructor(private bancoRepository:BancoRepository){}

    async validate(banco:Banco){

        if(!this.validarIdentificadorInexistente(banco)){
            throw new ForbiddenException({mensagem: `Banco sem identificação`});
        }

        if(!(await this.validarIdentificadorJaExistente(banco))){
            throw new ForbiddenException({mensagem: `Banco com identificação ${banco.identificacao} já existente`});
        }

    }

    private validarIdentificadorInexistente(banco:Banco):boolean{
        return banco.identificacao != null && banco.identificacao != '';
    }
    
    private async validarIdentificadorJaExistente(banco:Banco):Promise<boolean>{
        let bancoExistente = await this.bancoRepository.getByIdentificacao(banco.identificacao);
        
        return bancoExistente == null || bancoExistente.id == banco.id;
    }


}