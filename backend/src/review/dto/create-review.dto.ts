import { IsNotEmpty, IsOptional, IsString, IsUUID, IsInt, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rate: number;
}
