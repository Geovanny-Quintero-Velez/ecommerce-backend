import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('wish-list')
@ApiTags("Wish List")
export class WishListController {
  constructor(private readonly wishListService: WishListService) {}

  @Post()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  create(@Body() createWishListDto: CreateWishListDto) {
    return this.wishListService.create(createWishListDto);
  }

  @Get()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  findAll() {
    return this.wishListService.findAll();
  }

  @Get(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  findOne(@Param('id') id: string) {
    return this.wishListService.findOne(+id);
  }

  @Patch(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  update(@Param('id') id: string, @Body() updateWishListDto: UpdateWishListDto) {
    return this.wishListService.update(+id, updateWishListDto);
  }

  @Delete(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  remove(@Param('id') id: string) {
    return this.wishListService.remove(+id);
  }
}
