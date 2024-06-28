import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateWishListDto {
    @IsUUID()
    @IsOptional()
    wishlistid: string;

    @IsUUID()
    @IsNotEmpty()
    userid: string;
  
    @IsUUID()
    @IsNotEmpty()
    productid: string;

    @Type(() => Date)
    @IsOptional()
    createdat?: Date;
  
    @Type(() => Date)
    @IsOptional()
    deletedat?: Date;


}

