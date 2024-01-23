import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Application } from "./application.entity";

@Entity()
@Unique(["category", "application"])
export class ScoreBoard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    upperCategory: string;

    @Column()
    category: string;

    @Column()
    data: string;

    @Column()
    score: string;

    @ManyToOne(type => Application, application => application.scoreList)
    application: Application;
}