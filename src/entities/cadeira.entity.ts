import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Banco } from "./banco.entity";

@Entity()
export class Cadeira extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column("integer", {nullable: true})
    numero:number;

    @ManyToOne(type => Banco, banco => banco.cadeiras)
    banco: Banco;

}