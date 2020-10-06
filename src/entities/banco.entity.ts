import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cadeira } from "./cadeira.entity";

@Entity()
export class Banco extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column("integer", {nullable: true})
    numero:number;

    @Column("integer", {nullable: true})
    maxCadeiras:number;

    @OneToMany(type=> Cadeira, cadeira => cadeira.banco)
    cadeiras: Cadeira[];

}