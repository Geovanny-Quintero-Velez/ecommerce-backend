import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard, RolAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/user/Role/role.enum';
import { Roles } from 'src/decorator/rol.decorator';

@Controller('shipping-address')
@ApiTags("Shipping Address")
export class ShippingAddressController {
  constructor(private readonly shippingAddressService: ShippingAddressService) {}

  @Post()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  create(@Body() createShippingAddressDto: CreateShippingAddressDto) {
    return this.shippingAddressService.create(createShippingAddressDto);
  }

  @Get()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  findAll() {
    return this.shippingAddressService.findAll();
  }

  @Get(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  findOne(@Param("id", ParseUUIDPipe) id:string) {
    return this.shippingAddressService.findOne(id);
  }

  @Patch(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  update(@Param("id", ParseUUIDPipe) id:string, @Body() updateShippingAddressDto: UpdateShippingAddressDto) {
    return this.shippingAddressService.update(+id, updateShippingAddressDto);
  }

  @Delete(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  remove(@Param("id", ParseUUIDPipe) id:string) {
    return this.shippingAddressService.remove(+id);
  }
}
