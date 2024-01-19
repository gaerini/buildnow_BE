import { IsString } from 'class-validator';

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
  businessApplicationNum: string;

  @IsString()
  corporateApplicationNum: string;

  @IsString()
  workType: string;

  @IsString()
  estDate: string;
}
