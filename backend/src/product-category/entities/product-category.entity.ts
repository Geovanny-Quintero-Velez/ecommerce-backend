import { Entity, PrimaryColumn } from 'typeorm';

@Entity('productcategory')
export class ProductCategory {
    @PrimaryColumn('uuid')
    productid: string;
  
    @PrimaryColumn('uuid')
    categoryid: string;
}
