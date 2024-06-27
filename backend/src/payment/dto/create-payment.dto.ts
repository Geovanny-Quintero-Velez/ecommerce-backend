import { IsNotEmpty, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';

export class CreatePaymentDto {
    @IsUUID()
    @IsNotEmpty()
    orderid: string;
  
    @IsNumber()
    @IsNotEmpty()
    amount: number;
  
    @IsString()
    @IsNotEmpty()
    status: string;
  
    @IsString()
    @IsNotEmpty()
    paymentmethod: string;
  
    @IsString()
    @IsOptional()
    transactionid?: string;
  
    @IsString()
    @IsOptional()
    errormessage?: string;
  
    @IsOptional()
    apiresponse?: object;
}
