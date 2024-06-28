import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard, RolAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/user/Role/role.enum';
import { Roles } from 'src/decorator/rol.decorator';

@Controller('order-detail')
@ApiTags("Order Detail")
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  @ApiResponse({
    status: 400,
    description: 'Invalid data'
  })
  create(@Body() createOrderDetailDto: CreateOrderDetailDto) {
    return this.orderDetailService.create(createOrderDetailDto);
  }

  @Get()
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  findAll() {
    return this.orderDetailService.findAll();
  }

  @Get('order/:id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  findByOrder(@Param("id", ParseUUIDPipe) id:string) {
    return this.orderDetailService.findByOrder(id);
  }

  @Get(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  findOne(@Param("id", ParseUUIDPipe) id:string) {
    return this.orderDetailService.findOne(id);
  }

  @Patch(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  update(@Param("id", ParseUUIDPipe) id:string, @Body() updateOrderDetailDto: UpdateOrderDetailDto) {
    return this.orderDetailService.update(id, updateOrderDetailDto);
  }

  @Delete(':id')
  @ApiUnauthorizedResponse({description:"Unauthorized Bearer Auth"})
  @UseGuards(JwtAuthGuard, RolAuthGuard)
  @Roles([Role.ADMIN,Role.USER])
  @ApiBearerAuth()
  remove(@Param("id", ParseUUIDPipe) id:string) {
    return this.orderDetailService.remove(id);
  }
}
