import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('product')
@ApiTags("Product")
export class ProductController {
  constructor(private readonly productService: ProductService,
              
  ) {}

  @Post()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  async findOne(@Param("id", ParseUUIDPipe) id:string) {
    return this.productService.findOne(id);
  }

  @Get('category/:id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  async findProductsByCategory(@Param("id", ParseUUIDPipe) id:string) {
    return this.productService.findByCategory(id);
  }

  @Get()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  findAll() {
    return this.productService.findAll();
  }


  @Patch(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  update(@Param("id", ParseUUIDPipe) id:string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  remove(@Param("id", ParseUUIDPipe) id:string) {
    return this.productService.remove(+id);
  }
}
