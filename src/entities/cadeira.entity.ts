import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Banco } from "./banco.entity";

@Entity()
export class Cadeira extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column("character varying", {nullable: true})
    identificacao:string;

    @Column("integer", {nullable: true})
    situacao:number;

    @ManyToOne(type => Banco, banco => banco.cadeiras)
    banco: Banco;

}