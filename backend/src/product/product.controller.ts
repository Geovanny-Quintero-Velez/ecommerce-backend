import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard, RolAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorator/rol.decorator';
import { Role } from 'src/user/Role/role.enum';

@Controller('product')
@ApiTags("Product")
export class ProductController {
  constructor(private readonly productService: ProductService,      
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"}) 
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('admin')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  findAllA() {
    return this.productService.findAllD();
  }

  @Get('/admin/:id')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  async findOneD(@Param("id", ParseUUIDPipe) id:string) {
    return this.productService.findOneD(id);
  }





  @Get(':id')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  async findOne(@Param("id", ParseUUIDPipe) id:string) {
    return this.productService.findOne(id);
  }

  @Get('allinfo/:id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @ApiResponse({
    status: 200,
    description: 'The found record',
    schema: {
      example: {
        productid: "string",
        name: "string",
        imageurls: ["string","string"],
        description: "string",
        price: 0,
        stock: 0,
        rating: 0,
        reviewscount: 0,
        discount: 0,
        createdat: "2024-06-17T10:13:59.387Z",
        deletedat: "2024-06-17T10:13:59.387Z",
        lastmodifiedby: "string",
        lastmodifiedat: "2024-06-17T10:13:59.387Z",
        keywords: ["string","string"]
      }
    }
  })
  async find(@Param("id", ParseUUIDPipe) id:string) {
    return this.productService.findProductSummary(id);
  }

  @Get('category/:id')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  async findProductsByCategory(@Param("id", ParseUUIDPipe) id:string) {
    return this.productService.findByCategory(id);
  }

  @Get()
  findAll() {
    return this.productService.findAllProductSummary();
  }

  @Patch(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  update(@Param("id", ParseUUIDPipe) id:string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  remove(@Param("id", ParseUUIDPipe) id:string) {
    return this.productService.remove(id);
  }
}
