import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import {v4 as uuid} from  'uuid';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private readonly orderDetailService:OrderDetailService,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
    

  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    let toCreateOrder = new Order();
    toCreateOrder.setPrice(createOrderDto.price);
    if(createOrderDto.addressid){
      toCreateOrder.addressid=createOrderDto.addressid
    }
    if(createOrderDto.createdat){
      toCreateOrder.createdat=createOrderDto.createdat
    }
    if(createOrderDto.orderid){
      toCreateOrder.orderid=createOrderDto.orderid
    }
    if(createOrderDto.status){
      toCreateOrder.status=createOrderDto.status
    }
    if(createOrderDto.userid){
      toCreateOrder.userid=createOrderDto.userid
    }
    const order = this.ordersRepository.create(toCreateOrder);
    return this.ordersRepository.save(order);
  }

  async findOneDeleteds(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { orderid: id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async findAllDeleteds() {
    return await this.ordersRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { orderid: id , deletedat: null} });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async findByUserOrder(userId: string) {
    const order = await this.ordersRepository.findOne({ where: { userid: userId , deletedat: null,status:"ShoppingCart"} });
    let orderId=order.orderid
    if (!order) {
      throw new NotFoundException(`Order with ID ${userId} not found`);
    }
    const query = this.orderDetailsRepository.createQueryBuilder('o')
    .select([
      'o.orderdetailid as orderdetailid',
      'o.orderid as orderid',
      'o.productid as productid',
      'o.price as price',
      'o.quantity as quantity',
      'o.createdat as createdat',
      'o.deletedat as deletedat',
      'p.productid as product_productid',
      'p.name as product_name',
      'p.description as product_description',
      'p.price as product_price',
      'p.stock as product_stock',
      'p.discount as product_discount',
      'p.createdat as product_createdat',
      'p.deletedat as product_deletedat',
      'p.lastmodifiedby as product_lastmodifiedby',
      'p.lastmodifiedat as product_lastmodifiedat',
    ])
    .addSelect("array_agg(DISTINCT jsonb_build_object('img', pi.img, 'imageid', pi.imageid)) as product_images")
    .addSelect("array_agg(DISTINCT jsonb_build_object('category', c.name, 'categoryid', c.categoryid)) as product_categories")
    .innerJoin('product', 'p', 'p.productid = o.productid')
    .innerJoin('productcategory', 'pc', 'p.productid = pc.productid')
    .innerJoin('productimage', 'pi', 'p.productid = pi.productid')
    .innerJoin('category', 'c', 'pc.categoryid = c.categoryid')
    .where('o.orderid = :orderId', { orderId })
    .groupBy('o.orderdetailid, p.productid')
    .orderBy('p.name');

  const result = await query.getRawMany();
  const orderDetails = result.map(row => ({
    orderdetailid: row.orderdetailid,
    orderid: row.orderid,
    productid: row.productid,
    price: row.price,
    quantity: row.quantity,
    createdat: row.createdat,
    deletedat: row.deletedat,
    product: {
      productid: row.product_productid,
      name: row.product_name,
      description: row.product_description,
      price: row.product_price,
      stock: row.product_stock,
      discount: row.product_discount,
      createdat: row.product_createdat,
      deletedat: row.product_deletedat,
      lastmodifiedby: row.product_lastmodifiedby,
      lastmodifiedat: row.product_lastmodifiedat,
      images: row.product_images ? row.product_images.filter(Boolean) : [],
      categories: row.product_categories ? row.product_categories.filter(Boolean) : []
    }
  }));
    return {order,orderDetails};
  }

  async findAll() {
    return await this.ordersRepository.find({ where: { deletedat: null  }});
  }

  async update(id: uuid, updateOrderDto: UpdateOrderDto) {
    let toCreateOrder = new Order();
    toCreateOrder.setPrice(updateOrderDto.price);
    if(updateOrderDto.addressid){
      toCreateOrder.addressid=updateOrderDto.addressid
    }
    if(updateOrderDto.createdat){
      toCreateOrder.createdat=updateOrderDto.createdat
    }
    if(updateOrderDto.orderid){
      toCreateOrder.orderid=updateOrderDto.orderid
    }else{
      toCreateOrder.orderid=id
    }
    if(updateOrderDto.status){
      toCreateOrder.status=updateOrderDto.status
    }
    if(updateOrderDto.userid){
      toCreateOrder.userid=updateOrderDto.userid
    }
    const order = await this.ordersRepository.preload({
      ...toCreateOrder
    })
    if(!order){
      throw new NotFoundException("Order not found")
    }
    return await this.ordersRepository.save(order);
  }

  async updateOrder(id: uuid, order: Order) {
    return await this.ordersRepository.save(order);
  }

  async remove(id: uuid) {
    let order=await this.findOne(id)
    order.deletedat=new Date()
    return await this.ordersRepository.save(order);
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
