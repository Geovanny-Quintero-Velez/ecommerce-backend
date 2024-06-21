import { IsJSON, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateShipmentDto {

  @IsUUID()
  @IsOptional()
  shipmentId?: string;

  @IsUUID()
  @IsNotEmpty()
  orderid: string;

  @IsString()
  @IsOptional()
  carrier?: string;

  @IsString()
  @IsOptional()
  trackingnumber?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @Type(() => Date)
  @IsOptional()
  shippedat?: Date;

  @Type(() => Date)
  @IsOptional()
  expecteddeliveryat?: Date;

  @Type(() => Date)
  @IsOptional()
  deliveredat?: Date;

  @IsOptional()
  @IsObject()
  apiresponse?: object;

  @Type(() => Date)
  @IsOptional()
  createdat?: Date;

  @Type(() => Date)
  @IsOptional()
  deletedat?: Date;
}
