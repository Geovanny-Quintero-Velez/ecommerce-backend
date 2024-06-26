import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product-category')
@ApiTags("Product Category")
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Get(':categoryid')
  findByCategory(@Param("categoryid", ParseUUIDPipe) categoryid:string) {
    return this.productCategoryService.findCategory(categoryid);
  }

  @Get(':categoryid/:productid')
  findOne(@Param("categoryid", ParseUUIDPipe) categoryid:string,@Param("productid", ParseUUIDPipe) productid:string,) {
    return this.productCategoryService.findOne(categoryid,productid);
  }


  @Delete(':categoryid/:productid')
  remove(@Param("categoryid", ParseUUIDPipe) categoryid:string,@Param("productid", ParseUUIDPipe) productid:string) {
    return this.productCategoryService.remove(categoryid,productid);
  }
}
