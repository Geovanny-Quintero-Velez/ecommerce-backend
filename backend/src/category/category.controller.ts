import { Controller, Get, Body, Patch, Param, Delete, ParseUUIDPipe, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard, RolAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/user/Role/role.enum';
import { Roles } from 'decorator/rol.decorator';

@Controller('category')
@ApiTags("Category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Patch()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
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
