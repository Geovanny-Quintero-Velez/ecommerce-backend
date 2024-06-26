import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsUUID()
  @IsOptional()
  orderid?: string;

  @IsUUID()
  @IsNotEmpty()
  userid: string;

  @IsUUID()
  @IsOptional()
  addressid: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  status?: string;

  @Type(() => Date)
  @IsOptional()
  createdat?: Date;

  @Type(() => Date)
  @IsOptional()
  deletedat?: Date;
    
}
