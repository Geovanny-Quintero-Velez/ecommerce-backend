import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductKeywordDto } from './dto/create-product-keyword.dto';
import { UpdateProductKeywordDto } from './dto/update-product-keyword.dto';
import { ProductKeyword } from './entities/product-keyword.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductKeywordService {

  constructor(
    @InjectRepository(ProductKeyword)
    private productKeywordRepository: Repository<ProductKeyword>,
  ) {}

  async create(createProductKeywordDto: CreateProductKeywordDto): Promise<ProductKeyword> {
    const productKeyword = this.productKeywordRepository.create(createProductKeywordDto);
    return this.productKeywordRepository.save(productKeyword);
  }

  async update(id: string, updateProductKeywordDto: UpdateProductKeywordDto): Promise<ProductKeyword> {
    const productKeyword = await this.productKeywordRepository.preload({
      productkeywordid: id,
      ...updateProductKeywordDto,
    });
    if (!productKeyword) {
      throw new NotFoundException('ProductKeyword not found');
    }
    return this.productKeywordRepository.save(productKeyword);
  }

  async findOneD(id: string): Promise<ProductKeyword> {
    const productKeyword = await this.productKeywordRepository.findOne({ where: { productkeywordid: id  } });
    if (!productKeyword) {
      throw new NotFoundException('ProductKeyword not found');
    }
    return productKeyword;
  }

  async findAllD(): Promise<ProductKeyword[]> {
    return this.productKeywordRepository.find({});
  }

  async findOne(id: string): Promise<ProductKeyword> {
    const productKeyword = await this.productKeywordRepository.findOne({ where: { productkeywordid: id,deletedat: null  } });
    if (!productKeyword) {
      throw new NotFoundException('ProductKeyword not found');
    }
    return productKeyword;
  }

  async findAll(): Promise<ProductKeyword[]> {
    return this.productKeywordRepository.find({where:{deletedat: null }});
  }

  async remove(id: string): Promise<ProductKeyword> {
    let result = await this.findOne(id);
    result.deletedat=new Date()
    return this.productKeywordRepository.save(result)
  }
}
