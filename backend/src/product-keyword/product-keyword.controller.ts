import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductKeywordService } from './product-keyword.service';
import { CreateProductKeywordDto } from './dto/create-product-keyword.dto';
import { UpdateProductKeywordDto } from './dto/update-product-keyword.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product-keyword')
@ApiTags("Product Keyword")
export class ProductKeywordController {
  constructor(private readonly productKeywordService: ProductKeywordService) {}

  @Post()
  create(@Body() createProductKeywordDto: CreateProductKeywordDto) {
    return this.productKeywordService.create(createProductKeywordDto);
  }

  @Get()
  findAll() {
    return this.productKeywordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productKeywordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductKeywordDto: UpdateProductKeywordDto) {
    return this.productKeywordService.update(+id, updateProductKeywordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productKeywordService.remove(+id);
  }
}
