import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Applier } from "../applier.entity";

@Entity()
export class Certification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    workType1: string;

    @Column()
    workType2: string;

    @Column()
    workType3: string;

    @Column()
    workType4: string;

    @Column()
    workType5: string;

    @Column()
    workType6: string;

    @Column()
    ISO9001: boolean;

    @Column()
    ISO14001: boolean;

    @Column()
    ISO45001: boolean;

    @Column()
    KOSHA_MS: boolean;

    @Column()
    ISO19650: boolean;

    @Column()
    ESG: boolean;

    @Column()
    workType7: string;

    @Column()
    workType8: string;

}