import { Connection, getRepository, getConnection } from "typeorm";
import { Cadeira } from "src/entities/cadeira.entity";
import { Situacao } from "src/enums/cadeira/situacao.enum";
import { CadeiraRepository } from "src/repositories/cadeira.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CadeiraService{

    constructor(private _cadeiraRepository:CadeiraRepository){}


    async save(cadeira:Cadeira):Promise<Cadeira>{
        return await this._cadeiraRepository.save(cadeira);
    }

    async remove(id:number):Promise<Cadeira>{
        let cadeira:Cadeira = await this.get(id);
        cadeira.situacao = Situacao.INATIVO;
        return await this._cadeiraRepository.save(cadeira);
    }

    async get(id:number):Promise<Cadeira>{
        return await this._cadeiraRepository.get(id);
    }

    async getAll():Promise<Array<Cadeira>>{
        return await this._cadeiraRepository.getAll();
    }

}