import { IsArray, IsString } from 'class-validator';

export class SignUpApplierDto {
  @IsString()
  businessId: string;

  @IsString()
  password: string;

  @IsString()
  companyName: string;

  @IsString()
  ceoName: string;

  @IsString()
  companyAddress: string;

  @IsString()
  managerName: string;

  @IsString()
  managerPhoneNum: string;

  @IsString()
  managerEmail: string;

  @IsString()
  corporateApplicationNum: string;

  esg: boolean;

  companyPhoneNum: string;

  companyIntro: string;

  hadAccident: boolean;

  estDate: string;
}
