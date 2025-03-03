import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { OrderService } from '../order/order.service';
import { OrderDetailService } from '../order-detail/order-detail.service';
import { CreateOrderDetailDto } from '../order-detail/dto/create-order-detail.dto';
import {v4 as uuid} from  'uuid';
import Big from 'big.js';
import { OrderDetail } from '../order-detail/entities/order-detail.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class ShoppingCartService {

  constructor(
    private readonly orderService: OrderService,
    private readonly orderDetailService: OrderDetailService,
    private readonly productService:ProductService
  ) {}

  async update( updateShoppingCartDto: UpdateShoppingCartDto) {
    let order=await this.orderService.findOne(updateShoppingCartDto.orderid)
    let response=order;
    if(!order){
      throw new NotFoundException("Order not found")
    }
    const items=updateShoppingCartDto.items
    for(let i=0;i<items.length;i++){
      const item=items[i]
      const product=await this.productService.findOne(item.productid)
      let orderDetail:OrderDetail=new OrderDetail()
      orderDetail.setPrice(-product.price)
      orderDetail.multiply(product.discount)
      orderDetail.divide(100)
      orderDetail.add(product.price)
      orderDetail.multiply(item.quantity)
      item.price=+orderDetail.getPrice()
      const itemBeforeUpdate= await this.orderDetailService.isReplicated(item.orderid,item.productid)
      if(!itemBeforeUpdate){
        const orderD:CreateOrderDetailDto={
          orderid: item.orderid,
          productid: item.productid,
          quantity: item.quantity,
          price: +orderDetail.getPrice()
        }
        await this.orderDetailService.create(orderD)
        order.add(orderD.price)
        response=await this.orderService.updateOrder(order.orderid,order)
      }else {
        await this.orderDetailService.update(itemBeforeUpdate.orderdetailid,item)
        order.subtract(itemBeforeUpdate.price)
        order.add(orderDetail.getPrice())
        response=await this.orderService.updateOrder(order.orderid,order)
      }
    }
    return {updateShoppingCartDto,order:response};
  }

  async remove(orderid:uuid,productid:uuid){
    let order=await this.orderService.findOne(orderid)
    if(!order){
      throw new NotFoundException("Order not found")
    }
    const detail=await this.orderDetailService.removeByProductIdOrderID(orderid,productid)
    order.subtract(detail.price)
    await this.orderService.updateOrder(order.orderid,order)
    return {order,detail};
  }

  async buy( orderid: uuid) {
    let order=await this.orderService.findOne(orderid)
    if(!order){
      throw new NotFoundException("Order not found")
    }
    order.status="toPay"
    await this.orderService.updateOrder(order.orderid,order)
    const newShoppingCart={
      userid: order.userid,
      price: 0,
      status: "ShoppingCart",
      addressid: order.addressid
    }
    const sc=await this.orderService.create(newShoppingCart)
    return {Order:order,ShoppingCart:sc};
  }

}
