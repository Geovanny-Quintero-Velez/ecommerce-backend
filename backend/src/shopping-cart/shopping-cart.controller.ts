import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard, RolAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../user/Role/role.enum';
import { Roles } from '../decorator/rol.decorator';

@Controller('shopping-cart')
@ApiTags("Shopping Cart")
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Patch('buy/:id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  @ApiResponse({
    status: 400,
    description: 'Invalid data'
  })
  buy(@Param("id", ParseUUIDPipe) id: string) {
    return this.shoppingCartService.buy(id);
  }

  @Patch('item')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  addItems( @Body() updateShoppingCartDto: UpdateShoppingCartDto) {
    return this.shoppingCartService.update( updateShoppingCartDto);
  }

  @Patch('item/:orderid/:productid')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  removeItem(@Param("orderid", ParseUUIDPipe) orderid: string,@Param("productid", ParseUUIDPipe) productid: string) {
    return this.shoppingCartService.remove(orderid,productid);
  }

}
