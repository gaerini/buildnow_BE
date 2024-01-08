import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatentPaper } from "./patentPaper.entity";

@Entity()
export class PaperReq {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    paper1: string;

    @Column()
    paper2: string;

    @Column()
    paper3: string;

    @Column()
    paper4: string;

    @Column()
    paper5: string;

    @Column()
    paper6: string;

    @Column()
    paper7: string;

    @Column()
    paper8: string;

    @Column()
    paper9: string;

    @Column()
    paper10: string;

    @Column()
    paper11: string;

    @Column()
    paper12: string;

    @Column()
    paper13: string;

    @Column()
    paper14: string;

    @OneToMany(type=>PatentPaper, patentPaper => patentPaper.paperReq,{
        cascade: true,
    })
    patentPaperList: PatentPaper[];
}