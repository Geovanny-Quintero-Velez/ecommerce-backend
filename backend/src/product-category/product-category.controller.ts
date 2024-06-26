import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('product-category')
@ApiTags("Product Category")
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Post()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Get(':categoryid')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  findByCategory(@Param("categoryid", ParseUUIDPipe) categoryid:string) {
    return this.productCategoryService.findCategory(categoryid);
  }

  @Get(':categoryid/:productid')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  findOne(@Param("categoryid", ParseUUIDPipe) categoryid:string,@Param("productid", ParseUUIDPipe) productid:string,) {
    return this.productCategoryService.findOne(categoryid,productid);
  }


  @Delete(':categoryid/:productid')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  remove(@Param("categoryid", ParseUUIDPipe) categoryid:string,@Param("productid", ParseUUIDPipe) productid:string) {
    return this.productCategoryService.remove(categoryid,productid);
  }
}
