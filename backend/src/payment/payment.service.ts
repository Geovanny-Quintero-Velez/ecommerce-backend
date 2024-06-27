import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as braintree from 'braintree';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  private gateway: braintree.BraintreeGateway;
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private configService: ConfigService,
  ) {
    this.gateway = new braintree.BraintreeGateway({
      environment: braintree.Environment.Sandbox, // O Environment.Production para producción
      merchantId: this.configService.get<string>('BRAINTREE_MERCHANT_ID'),
      publicKey: this.configService.get<string>('BRAINTREE_PUBLIC_KEY'),
      privateKey: this.configService.get<string>('BRAINTREE_PRIVATE_KEY'),
    });
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
