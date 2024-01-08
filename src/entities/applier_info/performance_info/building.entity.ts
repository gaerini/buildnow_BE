import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PerformanceInfo } from "./performanceInfo.entity";

@Entity()
export class Building {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mainBuilding: string;

    @ManyToOne(type=>PerformanceInfo, performanceInfo => performanceInfo.buildingList,)
    @JoinColumn()
    performanceInfo: PerformanceInfo;
}