import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';

@Controller('shipping-address')
export class ShippingAddressController {
  constructor(private readonly shippingAddressService: ShippingAddressService) {}

  @Post()
  create(@Body() createShippingAddressDto: CreateShippingAddressDto) {
    return this.shippingAddressService.create(createShippingAddressDto);
  }

  @Get()
  findAll() {
    return this.shippingAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param("id", ParseUUIDPipe) id:string) {
    return this.shippingAddressService.findOne(id);
  }

  @Patch(':id')
  update(@Param("id", ParseUUIDPipe) id:string, @Body() updateShippingAddressDto: UpdateShippingAddressDto) {
    return this.shippingAddressService.update(+id, updateShippingAddressDto);
  }

  @Delete(':id')
  remove(@Param("id", ParseUUIDPipe) id:string) {
    return this.shippingAddressService.remove(+id);
  }
}
