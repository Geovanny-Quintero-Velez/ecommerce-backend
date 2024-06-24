import { IsUUID } from 'class-validator';

export class CreateProductCategoryDto {

    @IsUUID()
    productid: string;
  
    @IsUUID()
    categoryid: string;
}
