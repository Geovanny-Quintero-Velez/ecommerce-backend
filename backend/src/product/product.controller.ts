import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags("Product")
export class ProductController {
  constructor(private readonly productService: ProductService,
              
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get(':id')
  async findOne(@Param("id", ParseUUIDPipe) id:string) {
    return this.productService.findOne(id);
  }

  @Get('category/:id')
  async findProductsByCategory(@Param("id", ParseUUIDPipe) id:string) {
    return this.productService.findByCategory(id);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }


  @Patch(':id')
  update(@Param("id", ParseUUIDPipe) id:string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param("id", ParseUUIDPipe) id:string) {
    return this.productService.remove(+id);
  }
}
