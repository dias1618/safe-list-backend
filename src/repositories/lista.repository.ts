import { Injectable } from "@nestjs/common";
import { Lista } from "src/entities/lista.entity";
import { getRepository, getConnection } from "typeorm";
import { Participante } from "src/entities/participante.entity";

@Injectable()
export class ListaRepository{
    
    async save(lista:Lista):Promise<Lista>{
        return await getRepository(Lista).save(lista);
    }

    async get(id:number):Promise<Lista>{
        return await getRepository(Lista).createQueryBuilder('lista')
        .leftJoinAndSelect("lista.participantes", "participantes")
        .leftJoinAndSelect("participantes.dependentes", "dependentes")
        .where(`lista.id = ${id}`)
        .getOne();
    }

    async getByDate(date:string):Promise<Array<Lista>>{
        return await getRepository(Lista).createQueryBuilder('lista')
        .leftJoinAndSelect("lista.participantes", "participantes")
        .leftJoinAndSelect("participantes.dependentes", "dependentes")
        .where("lista.data BETWEEN :dataInicial AND :dataFinal", {dataInicial: this.getDataInicial(date), dataFinal: this.getDataFinal(date)})
        .getMany();
    }

    private getDataInicial(date:string){
        let data = new Date(date);
        data.setHours(0);
        data.setMinutes(0);
        data.setSeconds(0);
        data.setMilliseconds(0);
        return data.toISOString();
    }

    private getDataFinal(date:string){
        let data = new Date(date);
        data.setHours(24);
        data.setMinutes(59);
        data.setSeconds(59);
        data.setMilliseconds(59);
        return data.toISOString();
    }

    async addParticipante(lista:Lista, participante:Participante){
        await getConnection().createQueryBuilder()
        .relation(Lista, "participantes")
        .of(lista)
        .add(participante);
    }

}