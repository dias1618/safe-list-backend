import { Connection, getRepository, getConnection } from "typeorm";
import { Banco } from "src/entities/banco.entity";
import { Cadeira } from "src/entities/cadeira.entity";
import { Situacao as SituacaoBanco } from "src/enums/banco/situacao.enum";
import { Situacao as SituacaoCadeira } from "src/enums/cadeira/situacao.enum";

export class BancoService{

    constructor(private connection:Connection){}


    async save(banco:Banco):Promise<Banco>{
        return await getRepository(Banco).save(banco);
    }

    async remove(id:number):Promise<Banco>{
        let banco:Banco = await this.get(id);
        banco.situacao = SituacaoBanco.INATIVO;
        return await banco.save();
    }

    async removeAll():Promise<void>{
        let bancos:Banco[] = await this.getAll();
        for(let banco of bancos){
            banco.situacao = SituacaoBanco.INATIVO;
            await banco.save();
        }
    }

    async saveMany(quantidade:number):Promise<void>{
        
        for(let posicao:number=1; posicao <= quantidade; posicao++){
            let banco:Banco = new Banco();
            banco.identificacao = `${posicao}`;
            banco.maxCadeiras = 1;
            banco.situacao = SituacaoBanco.ATIVO;
            await getRepository(Banco).save(banco);

            let cadeira:Cadeira = new Cadeira();
            cadeira.identificacao = `${posicao}`;
            cadeira.situacao = SituacaoCadeira.ATIVO
            await getRepository(Cadeira).save(cadeira);

            this.addCadeira(banco, cadeira);
        }
    }

    async get(id:number):Promise<Banco>{
        return await getRepository(Banco).createQueryBuilder('banco')
        .leftJoinAndSelect("banco.cadeiras", "cadeiras")
        .where(`banco.id = ${id}`)
        .andWhere(`banco.situacao = ${SituacaoBanco.ATIVO}`)
        .getOne();
    }

    async getAll():Promise<Array<Banco>>{
        return await getRepository(Banco).createQueryBuilder('banco')
        .leftJoinAndSelect("banco.cadeiras", "cadeiras")
        .where(`banco.situacao = ${SituacaoBanco.ATIVO}`)
        .getMany();
    }

    async addCadeira(banco:Banco, cadeira:Cadeira){
        await getConnection().createQueryBuilder()
        .relation(Banco, "cadeiras")
        .of(banco)
        .add(cadeira);
    }

}