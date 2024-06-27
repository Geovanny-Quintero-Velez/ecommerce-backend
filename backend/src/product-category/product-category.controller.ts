import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard, RolAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/user/Role/role.enum';
import { Roles } from 'src/decorator/rol.decorator';

@Controller('product-category')
@ApiTags("Product Category")
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Post()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Get(':categoryid')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  findByCategory(@Param("categoryid", ParseUUIDPipe) categoryid:string) {
    return this.productCategoryService.findCategory(categoryid);
  }

  @Get(':categoryid/:productid')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  findOne(@Param("categoryid", ParseUUIDPipe) categoryid:string,@Param("productid", ParseUUIDPipe) productid:string,) {
    return this.productCategoryService.findOne(categoryid,productid);
  }


  @Delete(':categoryid/:productid')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  remove(@Param("categoryid", ParseUUIDPipe) categoryid:string,@Param("productid", ParseUUIDPipe) productid:string) {
    return this.productCategoryService.remove(categoryid,productid);
  }
}
