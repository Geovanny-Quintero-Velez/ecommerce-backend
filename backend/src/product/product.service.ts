import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {v4 as uuid} from  'uuid';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { productid: id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findAll() {
    return await this.productsRepository.find();
  }


  async update(id: uuid, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.preload({
      ...updateProductDto
    })
    if(!product){
      throw new NotFoundException("Category not found")
    }
    return await this.productsRepository.save(product);
  }

  async remove(id: uuid) {
    const product=await this.findOne(id)
    return await this.productsRepository.remove(product);
  }
}
