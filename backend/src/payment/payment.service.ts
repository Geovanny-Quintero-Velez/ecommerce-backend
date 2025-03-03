import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as braintree from 'braintree';
import { ConfigService } from '@nestjs/config';
import { Order } from '../order/entities/order.entity';
import { User } from '../user/entities/user.entity';
import { MailService } from '../mailer/mail.service';
import { OrderService } from '../order/order.service';
import { UserService } from '../user/user.service';

@Injectable()
export class PaymentService {
  private gateway: braintree.BraintreeGateway;
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private configService: ConfigService,
    private orderService: OrderService,
    private userService: UserService,
    private mailService: MailService
  ) {
    this.gateway = new braintree.BraintreeGateway({
      environment: braintree.Environment.Sandbox, // O Environment.Production para producción
      merchantId: this.configService.get<string>('BRAINTREE_MERCHANT_ID'),
      publicKey: this.configService.get<string>('BRAINTREE_PUBLIC_KEY'),
      privateKey: this.configService.get<string>('BRAINTREE_PRIVATE_KEY'),
    });
  }

  async generateToken(): Promise<string> {
    try {
      const token = await this.gateway.clientToken.generate({});
      console.log('Generated Braintree token:', token.clientToken);
      return token.clientToken;
    } catch (error) {
      console.error('Error generating Braintree token:', error.message);
      throw new Error(error.message);
    }
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    let payment = this.processPayment(createPaymentDto);
    return payment;
  }

  async processPayment(payment: CreatePaymentDto): Promise<Payment> {
    // Payment processing logic
    const { amount, paymentmethod } = payment
    try {
      const result = await this.gateway.transaction.sale({
        amount: amount.toString(),
        paymentMethodNonce: paymentmethod,
        options: {
          submitForSettlement: true,
        }
      })

      if (result.success) {
        const finishedPayment = this.paymentRepository.create({
          ...payment,
          status: 'COMPLETED',
          transactionid: result.transaction.id,
          apiresponse: result,
        })

        let order = await this.orderService.findOne(payment.orderid);
        let user = await this.userService.findOne((await order).userid);
        // Send email to user
        if (order && user) {
          //await this.mailService.sendOrderPaymentConfirmation((await user).username, (await user).email, (await order).orderid, (await order).price);
          await this.mailService.sendOrderPaymentConfirmation((await user).username, (await user).email, (await order).orderid, amount.toString());
        } else {
          console.log('Order or user not found at if');
        }

        return this.paymentRepository.save(finishedPayment)
      } else {
        const finishedPayment = this.paymentRepository.create({
          ...payment,
          status: 'FAILED',
          errormessage: result.message,
          apiresponse: result,
        });

        return this.paymentRepository.save(finishedPayment);
      }

    } catch (error) {
      const finishedPayment = this.paymentRepository.create({
        ...payment,
        status: 'FAILED',
        errormessage: error.message,
      });

      return this.paymentRepository.save(finishedPayment);
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.paymentRepository.preload({
      paymentid: id,
      ...updatePaymentDto,
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return this.paymentRepository.save(payment);
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { paymentid: id } });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async remove(id: string): Promise<void> {
    const result = await this.paymentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Payment not found');
    }
  }
}
