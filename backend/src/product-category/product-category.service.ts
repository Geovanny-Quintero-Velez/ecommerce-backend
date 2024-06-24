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

  async remove(productid: string, categoryid: string): Promise<void> {
    const result = await this.productCategoryRepository.delete({ productid, categoryid });
    if (result.affected === 0) {
      throw new NotFoundException('ProductCategory not found');
    }
  }

  async findAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.find({ relations: ['product', 'category'] });
  }

  async findOne(productid: string, categoryid: string): Promise<ProductCategory> {
    const productCategory = await this.productCategoryRepository.findOne({ where: { productid, categoryid }, relations: ['product', 'category'] });
    if (!productCategory) {
      throw new NotFoundException('ProductCategory not found');
    }
    return productCategory;
  }

  async findCategory( categoryid: string): Promise<ProductCategory[]> {
    const productCategory = await this.productCategoryRepository.find({ where: {  categoryid }, relations: ['product', 'category'] });
    if (!productCategory) {
      throw new NotFoundException('ProductCategory not found');
    }
    return productCategory;
  }
}
