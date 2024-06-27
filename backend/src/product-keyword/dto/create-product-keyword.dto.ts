import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateProductKeywordDto {
    @IsUUID()
    @IsNotEmpty()
    productId: string;
  
    @IsString()
    @IsNotEmpty()
    keyword: string;
}
