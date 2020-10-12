import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cadeira } from "./cadeira.entity";

@Entity()
export class Banco extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column("character varying", {nullable: true})
    identificacao:string;

    @Column("integer", {nullable: true})
    maxCadeiras:number;

    @Column("integer", {nullable: true})
    situacao:number;

    @OneToMany(type=> Cadeira, cadeira => cadeira.banco)
    cadeiras: Cadeira[];

}