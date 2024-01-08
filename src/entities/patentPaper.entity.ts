import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaperReq } from "./paperReq.entity";

@Entity()
export class PatentPaper{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(type=>PaperReq, paperReq=>paperReq.patentPaperList)
    @JoinColumn()
    paperReq: PaperReq;

    
}