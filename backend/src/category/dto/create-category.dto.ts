import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {


  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Date)
  @IsOptional()
  createdAt?: Date;

  @Type(() => Date)
  @IsOptional()
  deletedAt?: Date;

}
