import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { OrderService } from 'src/order/order.service';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { UserService } from 'src/user/user.service';
import { CreateOrderDetailDto } from 'src/order-detail/dto/create-order-detail.dto';
import { ProductService } from 'src/product/product.service';
import {v4 as uuid} from  'uuid';

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
      const itemBeforeUpdate= await this.orderDetailService.isReplicated(item.orderid,item.productid)
        if(!itemBeforeUpdate){
          const orderD:CreateOrderDetailDto={
            orderid: item.orderid,
            productid: item.productid,
            quantity: item.quantity,
            price: +item.price
          }
          await this.orderDetailService.create(orderD)
          order.price=(+order.price)+(+orderD.price)
          response=await this.orderService.update(order.orderid,order)
        }else {
          await this.orderDetailService.update(itemBeforeUpdate.orderdetailid,item)
          order.price=(+order.price)-(+itemBeforeUpdate.price)+(+item.price)
          response=await this.orderService.update(order.orderid,order)
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
    order.price=(+order.price)-(+detail.price)
    await this.orderService.update(order.orderid,order)
    return {order,detail};
  }

  async buy( orderid: uuid) {
    let order=await this.orderService.findOne(orderid)
    if(!order){
      throw new NotFoundException("Order not found")
    }
    order.status="toPay"
    await this.orderService.update(order.orderid,order)
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
