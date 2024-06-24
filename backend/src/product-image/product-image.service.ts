import { Injectable, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { ProductImage } from './entities/product-image.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
  ) {}

  async create(createProductImageDto: CreateProductImageDto): Promise<ProductImage> {
    const productImage = this.productImageRepository.create(createProductImageDto);
    return this.productImageRepository.save(productImage);
  }

  async update(@Param("id", ParseUUIDPipe) id:string, updateProductImageDto: UpdateProductImageDto): Promise<ProductImage> {
    
    const productImage = await this.productImageRepository.preload({
      ...updateProductImageDto,
    });
    
    if (!productImage) {
      throw new NotFoundException('ProductImage not found');
    }
    return this.productImageRepository.save(productImage);
  }

  async findAll(){
    return await this.productImageRepository.find({})
  }

  async findOne(@Param("id", ParseUUIDPipe) id:string): Promise<ProductImage> {
    const productImage = await this.productImageRepository.findOne({ where: { imageid: id } });
    if (!productImage) {
      throw new NotFoundException('ProductImage not found');
    }
    return productImage;
  }

  async remove(@Param("id", ParseUUIDPipe) id:string): Promise<void> {
    const result = await this.productImageRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('ProductImage not found');
    }
  }
}
