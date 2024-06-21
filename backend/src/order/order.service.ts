import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import {v4 as uuid} from  'uuid';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(order);
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { orderid: id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async findAll() {
    return await this.ordersRepository.find();
  }

  async update(id: uuid, updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersRepository.preload({
      ...updateOrderDto
    })
    if(!order){
      throw new NotFoundException("Order not found")
    }
    return await this.ordersRepository.save(order);
  }

  async remove(id: uuid) {
    const order=await this.findOne(id)
    return await this.ordersRepository.remove(order);
  }

  async getOrderSummary(orderId: string): Promise<any> {
    const query = this.ordersRepository.createQueryBuilder('o')
      .select([
        'o.orderid',
        'o.createdat AS order_created_at',
        'o.price AS order_total_price',
        'od.quantity',
        'od.price AS product_price',
        'p.name AS product_name',
        'p.description AS product_description'
      ])
      .innerJoin('orderdetail', 'od', 'o.orderid = od.orderid')
      .innerJoin('product', 'p', 'od.productid = p.productid')
      .where('o.orderid = :orderId', { orderId })
      .orderBy('p.name');
  
    const result = await query.getRawMany();
    if (!result) {
      throw new NotFoundException(`Order summary for ID ${orderId} not found`);
    }
    return result;
  }
}
