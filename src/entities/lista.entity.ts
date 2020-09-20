import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Participante } from "./participante.entity";

@Entity()
export class Lista extends BaseEntity{

    constructor(data: {id?:number, data?:Date, horaInicial?:Date, horaFinal?:Date}){
        super();
        this.id = data && data.id || 0;
        this.data = data && data.data;
        this.horaInicial = data && data.horaInicial;
        this.horaFinal = data && data.horaFinal;
    }

    @PrimaryGeneratedColumn()
    id:number;

    @Column("timestamp with time zone", {nullable: true})
    data:Date;

    @Column("timestamp with time zone", {nullable: true})
    horaInicial:Date;

    @Column("timestamp with time zone", {nullable: true})
    horaFinal:Date;

    @OneToMany(type=> Participante, participante => participante.lista)
    participantes: Participante[];

    toJson():string{
        return `{
            "id": ${this.id},
            "data": "${this.data}",
            "horaInicial": "${this.horaInicial}",
            "horaFinal": "${this.horaFinal}",
        }`
    }
}