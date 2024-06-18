import {IsInt, IsNotEmpty, IsOptional, IsUUID, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDetailDto {
    @IsUUID()
    @IsOptional()
    orderDetailId?: string;
  
    @IsUUID()
    @IsNotEmpty()
    orderId: string;
  
    @IsUUID()
    @IsNotEmpty()
    productId: string;
  
    @IsInt()
    @IsNotEmpty()
    quantity: number;
  
    @IsNumber()
    @IsNotEmpty()
    price?: number;
  
    @Type(() => Date)
    @IsOptional()
    createdAt?: Date;
  
    @Type(() => Date)
    @IsOptional()
    deletedAt?: Date;
}
