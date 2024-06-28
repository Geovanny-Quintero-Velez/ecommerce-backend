import {IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsUUID()
  @IsOptional()
  productid?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  keyword?: string[];


  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  stock: number;

  @IsNumber()
  @IsOptional()
  discount?: number;

  @Type(() => Date)
  @IsOptional()
  createdat?: Date;

  @Type(() => Date)
  @IsOptional()
  deletedat?: Date;

  @IsUUID()
  @IsOptional()
  lastmodifiedby?: string;

  @Type(() => Date)
  @IsOptional()
  lastmodifiedat?: Date;
}
