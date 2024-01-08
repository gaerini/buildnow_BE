import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Application } from "./application.entity";
import { Certification } from "./applier_info/certification.entity";
import { Finance } from "./finance.entity";
import { Client } from "./applier_info/client.entity";
import { Supplier } from "./applier_info/supplier.entity";
import { Patent } from "./applier_info/patent.entity";
import { License } from "./applier_info/license.entity";
import { Performance3yr } from "./applier_info/perfomance3yr.entity";
import { PaperReq } from "./paperReq.entity";
import { PerformanceInfo } from "./applier_info/performance_info/performanceInfo.entity";

@Entity()
export class Applier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    businessId: string;

    @Column()
    password: string;

    @Column()
    companyName: string;

    @Column()
    ceoName: string;

    @Column()
    companyAddress: string;

    @Column()
    managerName: string;

    @Column()
    managerPhoneNum: string;

    @Column()
    managerEmail: string;

    @Column()
    businessApplicationNum: string;

    @Column()
    corporateApplicationNum: string;

    @Column()
    workType: string;

    @Column()
    estDate: string;

    @OneToMany(type=>Application, application => application.applier, {
        cascade: true,
    })
    appliedList: Application[];

    @OneToOne(()=>Certification,{
        cascade: true,
    })
    @JoinColumn()
    certification: Certification;


    @OneToOne(()=>Finance, {
        cascade: true,
    })
    @JoinColumn()
    finance: Finance;

    @OneToMany(type=>Client, client => client.applier, {
        cascade: true,
    })
    clientList: Client[];

    @OneToMany(type=>Supplier, supplier => supplier.applier,{
        cascade: true,
    })
    supplierList: Supplier[];

    @OneToMany(type=>Patent, patent => patent.applier, {
        cascade: true,
    })
    patentList: Patent[];

    @OneToMany(type=>License, license=> license.applier,{
        cascade: true,
    })
    licenseList: License[];

    @OneToMany(type=>Performance3yr, performance3yr => performance3yr.applier,{
        cascade: true,
    })
    performance3yrList: Performance3yr[];

    @OneToOne(()=>PaperReq,{
        cascade: true,
    })
    @JoinColumn()
    paperReq: PaperReq;

    @OneToOne(()=>PerformanceInfo,{
        cascade: true,
    })
    performanceInfo: PerformanceInfo;
}