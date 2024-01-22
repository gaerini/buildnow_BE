import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Application } from "./application.entity";

@Entity()
export class ScoreBoard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uppperCategory: string;

    @Column()
    category: string;

    @Column()
    score: number;

    @ManyToOne(type => Application, application => application.scoreList)
    application: Application;
}