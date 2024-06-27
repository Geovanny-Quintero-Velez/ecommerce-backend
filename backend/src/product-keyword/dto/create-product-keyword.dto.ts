import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateProductKeywordDto {
    @IsUUID()
    @IsNotEmpty()
    productid: string;
  
    @IsString()
    @IsNotEmpty()
    keyword: string;
}
