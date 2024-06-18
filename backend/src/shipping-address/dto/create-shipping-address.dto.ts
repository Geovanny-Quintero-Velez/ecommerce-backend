import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateShippingAddressDto {
@IsUUID()
  @IsOptional()
  addressid?: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  zipcode: string;

  @Type(() => Date)
  @IsOptional()
  createdat?: Date;

  @Type(() => Date)
  @IsOptional()
  deletedat?: Date;
}
