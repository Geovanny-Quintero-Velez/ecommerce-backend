import {IsInt, IsNotEmpty, IsOptional, IsUUID, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDetailDto {
    @IsUUID()
    @IsOptional()
    orderdetailid?: string;
  
    @IsUUID()
    @IsNotEmpty()
    orderid: string;
  
    @IsUUID()
    @IsNotEmpty()
    productid: string;
  
    @IsInt()
    @IsNotEmpty()
    quantity: number;
  
    @IsNumber()
    @IsOptional()
    price: number;
  
    @Type(() => Date)
    @IsOptional()
    createdat?: Date;
  
    @Type(() => Date)
    @IsOptional()
    deletedat?: Date;
}
