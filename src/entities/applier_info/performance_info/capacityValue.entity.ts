import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PerformanceInfo } from "./performanceInfo.entity";

@Entity()
export class CapacityValue{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    constructionType: string;

    @Column()
    year1: number;

    @Column()
    year2: number;

    @Column()
    year3: number;

    @Column()
    nationalRanking: number;

    @Column()
    regionalRanking: number;

    @Column()
    nationalRankingRatio: number;

    @Column()
    regionalRankingRatio: number;

    @ManyToOne(type=>PerformanceInfo, performanceInfo => performanceInfo.capacityValueList)
    @JoinColumn()
    performanceInfo: PerformanceInfo;
}