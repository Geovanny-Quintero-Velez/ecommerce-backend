import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCategoryDto {


  @IsUUID()
  @IsOptional()
  categoryid?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Date)
  @IsOptional()
  createdat?: Date;

  @Type(() => Date)
  @IsOptional()
  deletedat?: Date;

}
