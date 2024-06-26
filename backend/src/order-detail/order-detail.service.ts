import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository } from 'typeorm';
import {v4 as uuid} from  'uuid';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetail> {
    const orderDetail = this.orderDetailsRepository.create(createOrderDetailDto);
    return this.orderDetailsRepository.save(orderDetail);
  }

  async findByOrder(id: string): Promise<OrderDetail[]> {
    const orderDetail = await this.orderDetailsRepository.find({ where: { orderid: id,deletedat:null } });
    if (!orderDetail) {
      throw new NotFoundException(`OrderDetail with ID ${id} not found`);
    }
    return orderDetail;
  }

  async findOne(id: string): Promise<OrderDetail> {
    const orderDetail = await this.orderDetailsRepository.findOne({ where: { orderdetailid: id,deletedat:null } });
    if (!orderDetail) {
      throw new NotFoundException(`OrderDetail with ID ${id} not found`);
    }
    return orderDetail;
  }

  async findByProductIdOrderID(orderidP: string,productidP:string): Promise<OrderDetail> {
    const orderDetail = await this.orderDetailsRepository.findOne({ where: { orderid: orderidP ,productid:productidP,deletedat:null} });
    if (!orderDetail) {
      throw new NotFoundException(`Order Detail not found`);
    }
    return orderDetail;
  }

  async isReplicated(id: string,productid:string) {
    const orderDetail = await this.orderDetailsRepository.find({ where: { orderid: id,deletedat:null } });
    let out=null
    for(let i=0;i<orderDetail.length;i++){
      if(orderDetail[i].productid==productid){
        out=orderDetail[i]
        break;
      }
    }
    return out;
  }

  async findAll() {
    return await this.orderDetailsRepository.find()
  }

  async update(id: uuid, updateOrderDetailDto: UpdateOrderDetailDto) {
    if(!updateOrderDetailDto.orderdetailid){
      updateOrderDetailDto.orderdetailid=id
    }
    const orderD = await this.orderDetailsRepository.preload({
      ...updateOrderDetailDto
    })
    if(!orderD){
      throw new NotFoundException("Order Detail not found")
    }
    return await this.orderDetailsRepository.save(orderD);
  }

  async remove(id: uuid) {
    let orderD=await this.findOne(id)
    orderD.deletedat=new Date()
    return await this.orderDetailsRepository.save(orderD);
  }

  async removeByProductIdOrderID(orderidP: string,productidP:string) {
    let orderD=await this.findByProductIdOrderID(orderidP,productidP)
    orderD.deletedat=new Date()
    return await this.orderDetailsRepository.save(orderD);
  }


}
