import { Banco } from "src/entities/banco.entity";
import { Cadeira } from "src/entities/cadeira.entity";
import { Situacao as SituacaoBanco } from "src/enums/banco/situacao.enum";
import { Situacao as SituacaoCadeira } from "src/enums/cadeira/situacao.enum";
import { BancoRepository } from "src/repositories/banco.repository";
import { CadeiraRepository } from "src/repositories/cadeira.repository";
import { BancoValidator } from "src/validators/banco.validator";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BancoService{

    constructor(
        private _bancoValidator:BancoValidator,
        private _bancoRepository:BancoRepository,
        private _cadeiraRepository:CadeiraRepository,
    ){}


    async insert(banco:Banco):Promise<Banco|{mensagem:string}>{
        await this._bancoValidator.validate(banco);
        banco = await this._bancoRepository.save(banco);
        await this.adicionarCadeira(banco);
        return banco;
    }

    async update(banco:Banco):Promise<Banco|{mensagem:string}>{
        await this._bancoValidator.validate(banco);
        return await this._bancoRepository.save(banco);
    }

    private async adicionarCadeira(banco:Banco):Promise<void>{
        let cadeira:Cadeira = new Cadeira();
        cadeira.identificacao = banco.identificacao;
        cadeira.situacao = SituacaoCadeira.ATIVO
        cadeira = await this._cadeiraRepository.save(cadeira);
        await this._bancoRepository.add(banco, cadeira);
        banco.cadeiras.push(cadeira);
    }

    async remove(id:number):Promise<Banco>{
        let banco:Banco = await this.get(id);
        banco.situacao = SituacaoBanco.INATIVO;
        return this._bancoRepository.save(banco);
    }

    async removeAll():Promise<void>{
        let bancos:Banco[] = await this.getAll();
        for(let banco of bancos){
            banco.situacao = SituacaoBanco.INATIVO;
            await this._bancoRepository.save(banco);
        }
    }

    async saveMany(quantidade:number):Promise<void>{
        
        for(let posicao:number=1; posicao <= quantidade; posicao++){
            let banco:Banco = new Banco();
            banco.identificacao = `${posicao}`;
            banco.maxCadeiras = 1;
            banco.situacao = SituacaoBanco.ATIVO;
            await this._bancoRepository.save(banco);

            let cadeira:Cadeira = new Cadeira();
            cadeira.identificacao = `${posicao}`;
            cadeira.situacao = SituacaoCadeira.ATIVO
            await this._cadeiraRepository.save(cadeira);

            await this._bancoRepository.add(banco, cadeira);
        }
    }

    async get(id:number):Promise<Banco>{
        return await this._bancoRepository.get(id);
    }

    async getAll():Promise<Array<Banco>>{
        return await this._bancoRepository.getAll();
    }

    async getByIdentificacao(identificador:string){
        return await this._bancoRepository.getByIdentificacao(identificador);
    }

    async add(banco:Banco, cadeira:Cadeira){
        await this._bancoRepository.add(banco, cadeira);
    }

}