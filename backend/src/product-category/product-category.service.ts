import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategory } from './entities/product-category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(createProductCategoryDto: CreateProductCategoryDto): Promise<ProductCategory> {
    const productCategory = this.productCategoryRepository.create(createProductCategoryDto);
    return this.productCategoryRepository.save(productCategory);
  }

  async remove( categoryid: string,productid: string) {
    const result = await this.productCategoryRepository.findOne({ where:{productid,categoryid} });
    console.log(result)
    return await this.productCategoryRepository.remove(result)
  }

  async findAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.find({ });
  }

  async findOne(productid: string, categoryid: string): Promise<ProductCategory> {
    const productCategory = await this.productCategoryRepository.findOne({ where: { productid, categoryid  }});
    if (!productCategory) {
      throw new NotFoundException('ProductCategory not found');
    }
    return productCategory;
  }

  async findCategory( categoryid: string): Promise<ProductCategory[]> {
    const productCategory = await this.productCategoryRepository.find({ where: {  categoryid }});
    if (!productCategory) {
      throw new NotFoundException('ProductCategory not found');
    }
    return productCategory;
  }
}
