import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShippingAddress } from './entities/shipping-address.entity';
import { Repository } from 'typeorm';
import {v4 as uuid} from  'uuid';

@Injectable()
export class ShippingAddressService {
  constructor(
    @InjectRepository(ShippingAddress)
    private shippingAddressesRepository: Repository<ShippingAddress>,
  ) {}

  async create(createShippingAddressDto: CreateShippingAddressDto): Promise<ShippingAddress> {
    const shippingAddress = this.shippingAddressesRepository.create(createShippingAddressDto);
    return this.shippingAddressesRepository.save(shippingAddress);
  }

  async findOne(id: string): Promise<ShippingAddress> {
    const shippingAddress = await this.shippingAddressesRepository.findOne({ where: { addressid: id } });
    if (!shippingAddress) {
      throw new NotFoundException(`ShippingAddress with ID ${id} not found`);
    }
    return shippingAddress;
  }

  async findAll() {
    return await this.shippingAddressesRepository.find();
  }


  async update(id: uuid, updateShippingAddressDto: UpdateShippingAddressDto) {
    const shipA = await this.shippingAddressesRepository.preload({
      ...updateShippingAddressDto
    })
    if(!shipA){
      throw new NotFoundException("Shipping Address not found")
    }
    return await this.shippingAddressesRepository.save(shipA);
  }

  async remove(id: uuid) {
    const shipD=await this.findOne(id)
    return await this.shippingAddressesRepository.remove(shipD);
  }
}
