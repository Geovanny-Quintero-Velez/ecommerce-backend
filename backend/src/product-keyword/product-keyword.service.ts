import { Injectable } from '@nestjs/common';
import { CreateProductKeywordDto } from './dto/create-product-keyword.dto';
import { UpdateProductKeywordDto } from './dto/update-product-keyword.dto';

@Injectable()
export class ProductKeywordService {
  create(createProductKeywordDto: CreateProductKeywordDto) {
    return 'This action adds a new productKeyword';
  }

  findAll() {
    return `This action returns all productKeyword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productKeyword`;
  }

  update(id: number, updateProductKeywordDto: UpdateProductKeywordDto) {
    return `This action updates a #${id} productKeyword`;
  }

  remove(id: number) {
    return `This action removes a #${id} productKeyword`;
  }
}
