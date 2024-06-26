import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('shipment')
@ApiTags("Shipment")
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Post()
  create(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentService.create(createShipmentDto);
  }

  @Get()
  findAll() {
    return this.shipmentService.findAll();
  }

  @Get(':id')
  findOne(@Param("id", ParseUUIDPipe) id:string) {
    return this.shipmentService.findOne(id);
  }

  @Patch(':id')
  update(@Param("id", ParseUUIDPipe) id:string, @Body() updateShipmentDto: UpdateShipmentDto) {
    return this.shipmentService.update(+id, updateShipmentDto);
  }

  @Delete(':id')
  remove(@Param("id", ParseUUIDPipe) id:string) {
    return this.shipmentService.remove(id);
  }
}
