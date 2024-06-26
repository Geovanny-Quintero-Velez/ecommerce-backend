import { Controller, Get, Body, Patch, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('category')
@ApiTags("Category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Patch()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  findOne(@Param("id", ParseUUIDPipe) id:string) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  update(@Param("id", ParseUUIDPipe) id:string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  remove(@Param("id", ParseUUIDPipe) id:string) {
    return this.categoryService.remove(id);
  }
}
