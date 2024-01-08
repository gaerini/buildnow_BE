import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Finance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    creditGrade: string;

    @Column()
    cashFlowGrade: string;

    @Column()
    watchGrade: string;

    @Column()
    salesRevenue: number;

    @Column()
    operatingMarginRatio: number;

    @Column()
    netProfitMarginRatio: number;

    @Column()
    currentRatio: number;

    @Column()
    quickRatio: number;

    @Column()
    debtToEquityRatio: number;

    @Column()
    debtDependency: number;

}