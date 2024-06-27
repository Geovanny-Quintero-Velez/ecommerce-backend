import { Controller, Get, Body, Patch, Param, Delete, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard, RolAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/user/Role/role.enum';
import { Roles } from 'src/decorator/rol.decorator';

@Controller('category')
@ApiTags("Category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  findOne(@Param("id", ParseUUIDPipe) id:string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  update(@Param("id", ParseUUIDPipe) id:string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  remove(@Param("id", ParseUUIDPipe) id:string) {
    return this.categoryService.remove(id);
  }
}
