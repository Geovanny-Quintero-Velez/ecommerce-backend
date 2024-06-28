import { IsNotEmpty, IsOptional, IsString, IsUUID, IsInt } from 'class-validator';
export class CreateProductImageDto {

  @IsUUID()
  @IsNotEmpty()
  productid: string;

  @IsString()
  @IsNotEmpty()
  img: string;

  @IsInt()
  @IsNotEmpty()
  position: number;
}
