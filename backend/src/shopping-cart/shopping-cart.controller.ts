import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('shopping-cart')
@ApiTags("Shopping Cart")
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Patch('buy/:id')
  buy(@Param("id", ParseUUIDPipe) id: string) {
    return this.shoppingCartService.buy(id);
  }

  @Patch('item')
  addItems( @Body() updateShoppingCartDto: UpdateShoppingCartDto) {
    return this.shoppingCartService.update( updateShoppingCartDto);
  }

  @Patch('item/:orderid/:productid')
  removeItem(@Param("orderid", ParseUUIDPipe) orderid: string,@Param("productid", ParseUUIDPipe) productid: string) {
    return this.shoppingCartService.remove(orderid,productid);
  }

}
