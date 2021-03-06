import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Lista } from "./lista.entity";
import { Cadeira } from "./cadeira.entity";

@Entity()
export class Participante extends BaseEntity{

    constructor(data: {id?:number, nome?:string, telefone?:string, fixo?:boolean}){
        super();
        this.id = data && data.id || 0;
        this.nome = data && data.nome || "";
        this.telefone = data && data.telefone || "";
        this.fixo = data && data.fixo || false;
    }

    @PrimaryGeneratedColumn()
    id:number;

    @Column("varchar", {nullable: true})
    nome:string;

    @Column("varchar", {nullable: true})
    telefone:string;

    @Column("boolean", {nullable: true})
    fixo:boolean;

    @ManyToOne(type => Lista, lista => lista.participantes)
    lista: Lista;

    @ManyToOne(type => Participante, participante => participante.dependentes)
    responsavel: Participante;

    @OneToMany(type=> Participante, participante => participante.responsavel)
    dependentes: Participante[];

    @ManyToMany(type => Cadeira)
    @JoinTable()
    cadeiras: Cadeira[];

    toJson():string{
        return `{
            "id": ${this.id},
            "nome": "${this.nome}",
            "telefone": "${this.telefone}",
            "fixo": "${this.fixo}"
        }`
    }
}