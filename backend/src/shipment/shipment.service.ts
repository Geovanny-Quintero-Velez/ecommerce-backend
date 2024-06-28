import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shipment } from './entities/shipment.entity';
import { Repository } from 'typeorm';
import {v4 as uuid} from  'uuid';

@Injectable()
export class ShipmentService {

  constructor(
    @InjectRepository(Shipment)
    private shipmentsRepository: Repository<Shipment>,
  ) {}

  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const shipment = this.shipmentsRepository.create(createShipmentDto);
    return this.shipmentsRepository.save(shipment);
  }

  async findOne(id: string): Promise<Shipment> {
    const shipment = await this.shipmentsRepository.findOne({ where: { shipmentid: id,deletedat: null  } });
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }

  async findAll() {
    return await this.shipmentsRepository.find({where:{deletedat: null }});
  }

  async findOneD(id: string): Promise<Shipment> {
    const shipment = await this.shipmentsRepository.findOne({ where: { shipmentid: id } });
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }

  async findAllD() {
    return await this.shipmentsRepository.find({});
  }


  async update(id: uuid, updateShipmentDto: UpdateShipmentDto) {
    const shipD = await this.shipmentsRepository.preload({
      ...updateShipmentDto
    })
    if(!shipD){
      throw new NotFoundException("Shipment not found")
    }
    return await this.shipmentsRepository.save(shipD);
  }

  async remove(id: uuid) {
    let shipD=await this.findOne(id)
    shipD.deletedat=new Date()
    return await this.shipmentsRepository.save(shipD);
  }
}
