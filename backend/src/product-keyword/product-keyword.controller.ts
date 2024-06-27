import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProductKeywordService } from './product-keyword.service';
import { CreateProductKeywordDto } from './dto/create-product-keyword.dto';
import { UpdateProductKeywordDto } from './dto/update-product-keyword.dto';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard, RolAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/user/Role/role.enum';
import { Roles } from 'src/decorator/rol.decorator';

@Controller('product-keyword')
@ApiTags("Product Keyword")
export class ProductKeywordController {
  constructor(private readonly productKeywordService: ProductKeywordService) {}

  @Post()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  create(@Body() createProductKeywordDto: CreateProductKeywordDto) {
    return this.productKeywordService.create(createProductKeywordDto);
  }

  @Get()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  findAll() {
    return this.productKeywordService.findAll();
  }

  @Get(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  findOne(@Param("id", ParseUUIDPipe) id:string) {
    return this.productKeywordService.findOne(+id);
  }

  @Patch(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  update(@Param("id", ParseUUIDPipe) id:string, @Body() updateProductKeywordDto: UpdateProductKeywordDto) {
    return this.productKeywordService.update(+id, updateProductKeywordDto);
  }

  @Delete(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  remove(@Param("id", ParseUUIDPipe) id:string) {
    return this.productKeywordService.remove(+id);
  }
}
