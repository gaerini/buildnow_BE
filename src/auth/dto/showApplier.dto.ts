import { Application } from 'src/entities/application.entity';
import { Applier } from '../applier/applier.entity';
import { Finance } from 'src/entities/applier_info/finance.entity';
import { PaperReq } from 'src/entities/applier_info/paperReq.entity';
import { History } from 'src/entities/applier_info/history.entity';
import { PossibleWorkType } from 'src/entities/applier_info/possibleWorkType.entity';

export class ShowApplierDto {
  businessId: string;
  companyName: string;
  ceoName: string;
  companyAddress: string;
  managerName: string;
  managerPhoneNum: string;
  managerEmail: string;
  corporateApplication: string;
  esg: boolean;
  iso: boolean;
  appliedList: Application[];
  finance: Finance;
  paperReqList: PaperReq[];
  historyList: History[];
  possibleWorkTypeList: PossibleWorkType[];

  constructor(applier: Applier) {
    this.businessId = applier.businessId;
    this.companyName = applier.companyName;
    this.ceoName = applier.ceoName;
    this.companyAddress = applier.companyAddress;
    this.managerName = applier.managerName;
    this.managerPhoneNum = applier.managerPhoneNum;
    this.managerEmail = applier.managerEmail;
    this.corporateApplication = applier.corporateApplicationNum;
    this.esg = applier.esg;
    this.appliedList = applier.appliedList;
    this.finance = applier.finance;
    this.paperReqList = applier.paperReqList;
    this.historyList = applier.historyList;
    this.possibleWorkTypeList = applier.possibleWorkTypeList;
  }
}
